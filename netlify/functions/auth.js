exports.handler = async (event) => {
  const { code } = event.queryStringParameters || {};

  if (!code) {
    return {
      statusCode: 302,
      headers: {
        Location:
          "https://github.com/login/oauth/authorize" +
          "?client_id=" + process.env.OAUTH_CLIENT_ID +
          "&scope=repo,user",
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
        body: '<html><body><p>Auth error: ' + (data.error_description || data.error) + '</p></body></html>',
      };
    }

    const token = data.access_token;
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="text-align:center;padding:60px;font-family:sans-serif;">
  <h2>Login successful</h2>
  <p>Redirecting to admin...</p>
  <script>
    try {
      if (window.opener && window.opener.location) {
        window.opener.location.hash = "access_token=${token}&provider=github";
      }
    } catch(e) {}
    window.location.href = "/admin/#access_token=${token}&provider=github";
  </script>
</body></html>`,
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: '<html><body><p>Error: ' + err.message + '</p></body></html>',
    };
  }
};
