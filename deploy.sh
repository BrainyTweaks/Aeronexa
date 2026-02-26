#!/bin/bash
# deploy.sh - Deploy Aeronexa to Vercel

set -e

echo "Building Aeronexa..."
npm run build

echo "Deploying to Vercel..."
vercel --prod

echo "Deployment complete!"
