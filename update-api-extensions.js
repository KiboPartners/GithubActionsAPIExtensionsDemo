require('dotenv').config();
const fs = require('fs');
const path = require('path');
const AppClient = require("mozu-node-sdk/clients/platform/application")
const Client = require('mozu-node-sdk/client');
const constants = Client.constants;

// Initialize client with credentials
const client = AppClient({
    context: {
        appKey: process.env.APP_KEY,
        sharedSecret: process.env.SHARED_SECRET,
        tenant: process.env.TENANT,
        site: process.env.SITE,
        baseUrl: process.env.BASE_URL
    }
});

// Create API extension resource using Client.sub
const apiExtensionResourceFactory = Client.sub({
    updateExtensions: Client.method({
        method: "PUT",
        url: '{+tenantPod}api/platform/extensions'
    })
});

async function updateApiExtensions() {
    try {
        // Read the configuration file
        const configPath = path.join(__dirname, 'api-extensions-config.json');
        const configData = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(configData);

        console.log('Reading API extensions configuration...');
        console.log(JSON.stringify(config, null, 2));

        // Create the API extension resource with context
        const apiExtensionResource = apiExtensionResourceFactory(client);
        
        // Update the API extensions
        console.log('Updating API extensions for tenant:', process.env.TENANT);
        
        const result = await apiExtensionResource.updateExtensions({}, {
            body: config
        });

        console.log('API extensions updated successfully!');
        console.log('Response:', JSON.stringify(result, null, 2));
        
    } catch (error) {
        console.error('Error updating API extensions:', error);
        if (error.originalError) {
            console.error('Original error:', error.originalError);
        }
        if (error.responseBody) {
            console.error('Response body:', error.responseBody);
        }
        process.exit(1);
    }
}

// Run the update
updateApiExtensions();
