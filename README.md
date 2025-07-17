# Kibo API Extensions GitHub Actions Demo

This project automates the deployment of API Extensions configuration to a Kibo tenant using GitHub Actions.

## Overview

When you commit changes to the `api-extensions-config.json` file and push to any branch, a GitHub Action will automatically update the API extensions configuration for your Kibo tenant.

## Setup

### 1. Configure GitHub Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `APP_KEY` - Your application key
- `SHARED_SECRET` - Your application shared secret
- `TENANT` - Your tenant ID (e.g., 1000333)
- `SITE` - Your site ID (e.g., 1000700)
- `BASE_URL` - Your tenant base URL (e.g., https://t1000333.sb.usc1.gcp.kibocommerce.com)

### 2. Configure API Extensions

Edit the `api-extensions-config.json` file to define your API extensions configuration:

```json
{
    "actions": [
        {
            "actionId": "http.commerce.fulfillment.createShipments.after",
            "contexts": [
                {
                    "customFunctions": [
                        {
                            "applicationKey": "your.application.key",
                            "functionId": "your.function.id",
                            "enabled": true
                        }
                    ]
                }
            ]
        }
    ],
    "configurations": [],
    "defaultLogLevel": "Info"
}
```

## Usage

1. Make changes to `api-extensions-config.json`
2. Commit and push your changes
3. The GitHub Action will automatically deploy the configuration to your Kibo tenant

## Local Testing

To test the script locally:

1. Copy `.env.example` to `.env` and fill in your credentials
2. Run `npm install`
3. Run `node update-api-extensions.js`

## Workflow Triggers

The GitHub Action runs:
- On any push that modifies `api-extensions-config.json`
- Manually via the Actions tab (workflow_dispatch)