export async function onRequestPost(context) {
  try {
    const data = await context.request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    if (!context.env.RESEND_API_KEY) {
      return new Response("API Key Missing in Cloudflare Settings", { status: 500 });
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
      // Redirects to your home page with a success message in the URL
      return Response.redirect(new URL('/index.html?success=true', context.request.url), 303);
    } else {
      const errorText = await res.text();
      return new Response(`Resend Error: ${errorText}`, { status: 500 });
    }
  } catch (err) {
    return new Response(`Server Error: ${err.message}`, { status: 500 });
  }
}

// Adding this lets you test the URL in your browser directly
export async function onRequestGet() {
  return new Response("Function is active! Use the form to submit.");
}
