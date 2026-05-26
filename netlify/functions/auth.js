exports.handler = async (event) => {
  const { code } = event.queryStringParameters || {};

  if (!code) {
    return {
      statusCode: 302,
      headers: {
        Location: "https://github.com/login/oauth/authorize" +
          "?client_id=" + process.env.OAUTH_CLIENT_ID +
          "&redirect_uri=" + encodeURIComponent("https://radiant-phoenix-d4e6a6.netlify.app/api/auth") +
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
        statusCode: 302,
        headers: { Location: "/admin/?error=" + encodeURIComponent(data.error_description || data.error) },
      };
    }

    return {
      statusCode: 302,
      headers: {
        Location: "/admin/callback.html#access_token=" + data.access_token + "&provider=github",
      },
    };
  } catch (err) {
    return {
      statusCode: 302,
      headers: { Location: "/admin/?error=" + encodeURIComponent(err.message) },
    };
  }
};
