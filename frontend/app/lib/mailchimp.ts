"use server"

import crypto from "crypto"

interface MailchimpResponse {
    success: boolean
    message?: string
}

export async function subscribeToNewsletter(email: string): Promise<MailchimpResponse> {
    if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX || !process.env.MAILCHIMP_LIST_ID) {
        console.error("Mailchimp configuration is missing")
        return {
            success: false,
            message: "Newsletter service is not configured properly.",
        }
    }

    try {
        // Create MD5 hash of lowercase email for Mailchimp API
        const emailHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex")

        const apiKey = process.env.MAILCHIMP_API_KEY
        const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX
        const listId = process.env.MAILCHIMP_LIST_ID
        const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/${emailHash}`

        // Check if the user is already subscribed
        const checkResponse = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(`apikey:${apiKey}`).toString("base64")}`,
            },
        })

        if (checkResponse.status === 200) {
            const data = await checkResponse.json()

            if (data.status === "subscribed") {
                return {
                    success: true,
                    message: "You're already subscribed to our newsletter!",
                }
            }
        }

        // Subscribe the user
        const response = await fetch(`https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(`apikey:${apiKey}`).toString("base64")}`,
            },
            body: JSON.stringify({
                email_address: email,
                status: "subscribed",
            }),
        })

        const responseData = await response.json()

        if (response.status >= 400) {
            if (responseData.title === "Member Exists") {
                return {
                    success: true,
                    message: "You're already subscribed to our newsletter!",
                }
            }

            return {
                success: false,
                message: responseData.detail || "Failed to subscribe. Please try again.",
            }
        }

        return {
            success: true,
        }
    } catch (error) {
        console.error("Error subscribing to newsletter:", error)
        return {
            success: false,
            message: "An unexpected error occurred. Please try again later.",
        }
    }
}

