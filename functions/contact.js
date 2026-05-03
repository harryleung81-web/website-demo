export async function onRequestPost(context) {
  try {
    // 1. Check if the API key even exists
    if (!context.env.RESEND_API_KEY) {
      return new Response("Configuration Error: RESEND_API_KEY is missing in Cloudflare Dashboard.", { status: 500 });
    }

    const data = await context.request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    // 2. Simple validation
    if (!name || !email || !message) {
      return new Response("Please fill out all fields.", { status: 400 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ParrAlign Website <website@parralign.io>',
        to: 'info@parralign.com',
        subject: `New Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
      }),
    });

    if (res.ok) {
      // 303 See Other is the correct redirect for a POST result
      return Response.redirect(new URL('/index.html?success=true', context.request.url), 303);
    } else {
      const errorText = await res.text();
      return new Response(`Resend API Error: ${errorText}`, { status: 500 });
    }

  } catch (err) {
    return new Response(`Internal Server Error: ${err.message}`, { status: 500 });
  }
}
