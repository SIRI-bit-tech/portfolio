const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-deepOlive text-white py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold text-brightOrange">SiriDev</h2>
                        <p className="text-gray-300 mt-2">Building exceptional digital experiences</p>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-gray-300">&copy; {currentYear} SiriDev. All rights reserved.</p>
                        <p className="text-gray-400 text-sm mt-1">Designed and developed with ❤️</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

