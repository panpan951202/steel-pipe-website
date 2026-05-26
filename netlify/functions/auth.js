exports.handler = async (event) => {
  const { code } = event.queryStringParameters || {};

  if (!code) {
    return {
      statusCode: 302,
      headers: {
        Location:
          "https://github.com/login/oauth/authorize" +
          "?client_id=" + process.env.OAUTH_CLIENT_ID +
          "&scope=repo,user" +
          "&redirect_uri=" + encodeURIComponent("https://radiant-phoenix-d4e6a6.netlify.app/api/auth"),
      },
    };
  }

  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.OAUTH_CLIENT_ID,
          client_secret: process.env.OAUTH_CLIENT_SECRET,
          code,
        }),
      }
    );
    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: '<html><body><script>window.opener.postMessage({error:"' + data.error + '"}, window.location.origin);window.close();</script></body></html>',
      };
    }

    const msg = JSON.stringify({ token: data.access_token, provider: "github" });
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="text-align:center;padding:60px;font-family:sans-serif;">
  <h2>Login successful</h2>
  <p>Sending token to main window...</p>
  <script>
    var msg = ${msg};
    var origin = window.location.origin;
    var attempts = 0;
    function send() {
      if (window.opener) {
        window.opener.postMessage(msg, origin);
        attempts++;
        if (attempts < 5) { setTimeout(send, 500); }
        else { setTimeout(function(){window.close();}, 1500); }
      }
    }
    setTimeout(send, 1000);
  </script>
</body></html>`,
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: '<html><body><script>window.opener.postMessage({error:"' + err.message + '"}, window.location.origin);window.close();</script></body></html>',
    };
  }
};
