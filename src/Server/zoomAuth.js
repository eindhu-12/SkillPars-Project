const axios = require('axios');
const qs = require('querystring');

// Store token and expiry
let zoomToken = null;
let tokenExpiry = 0;

const getZoomAccessToken = async () => {
    const clientId = 'YOUR_CLIENT_ID';
    const clientSecret = 'YOUR_CLIENT_SECRET';
    const accountId = 'YOUR_ACCOUNT_ID';

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    // If the token is still valid, return it
    if (zoomToken && currentTime < tokenExpiry) {
        return zoomToken;
    }

    try {
        // Request new token from Zoom
        const response = await axios.post(
            'https://zoom.us/oauth/token',
            qs.stringify({
                grant_type: 'account_credentials',
                account_id: accountId
            }),
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        // Store the new token and expiry time
        zoomToken = response.data.access_token;
        tokenExpiry = currentTime + response.data.expires_in; // Token expires in 3600 sec (1 hour)

        console.log('✅ Zoom Access Token Updated');
        return zoomToken;
    } catch (error) {
        console.error('❌ Error fetching Zoom access token:', error.response ? error.response.data : error.message);
    }
};

module.exports = { getZoomAccessToken };
