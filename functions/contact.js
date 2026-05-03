export async function onRequestPost(context) {
  const data = await context.request.formData();
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'ParrAlign Website <website@parralign.io>',
      to: 'info@parralign.com', // Your actual inbox
      subject: `New Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
    }),
  });

  return res.ok 
    ? Response.redirect(new URL('/index.html?success=true', context.request.url), 303)
    : new Response('Error sending email', { status: 500 });
}