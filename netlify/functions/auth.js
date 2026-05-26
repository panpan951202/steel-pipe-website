exports.handler = async (event) => {
  const { code, provider } = event.queryStringParameters || {};

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
        body: '<html><body><script>window.opener.postMessage({error:"' + (data.error_description || data.error) + '"},window.location.origin);</script><p>Auth failed. Close this window.</p></body></html>',
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body:
        '<!DOCTYPE html><html><head><script>' +
        'window.opener.postMessage(' + JSON.stringify({
          token: data.access_token,
          provider: "github",
        }) + ', window.location.origin);' +
        '</script></head><body style="text-align:center;padding-top:60px;font-family:sans-serif;">' +
        '<h2>Login successful</h2><p>This window will close automatically.</p>' +
        '<script>setTimeout(function(){window.close();},2000);</script>' +
        '</body></html>',
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: '<html><body><script>window.opener.postMessage({error:"' + err.message + '"},window.location.origin);</script><p>Error. Close this window.</p></body></html>',
    };
  }
};
