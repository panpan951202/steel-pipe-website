const crypto = require("crypto");

exports.handler = async (event) => {
  const { code } = event.queryStringParameters || {};

  if (!code) {
    return {
      statusCode: 302,
      headers: { Location: "/admin/" },
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

    if (data.error) throw new Error(data.error_description);

    const content = `<!DOCTYPE html><html><head><script>
      window.opener.postMessage(
        ${JSON.stringify({
          token: data.access_token,
          provider: "github",
        })},
        window.location.origin
      );
      window.close();
    </script></head><body><p>Logged in. Closing...</p></body></html>`;

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: content,
    };
  } catch (err) {
    return {
      statusCode: 302,
      headers: {
        Location: `/admin/?error=${encodeURIComponent(err.message)}`,
      },
    };
  }
};
