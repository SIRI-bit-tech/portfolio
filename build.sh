#!/usr/bin/env bash
# exit on error
set -o errexit

# Build frontend
cd frontend
npm install
npm run build

# Build backend
cd ../backend
python -m pip install --upgrade pip
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input
python manage.py migrate
