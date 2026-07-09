import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const authUser = process.env.SMTP_USER || 'choliasmenos.panos@gmail.com';
  const authPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_EMAIL || 'choliasmenos.panos@gmail.com';

  if (!authPass) {
    console.error('SMTP_PASS not configured');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user: authUser, pass: authPass },
  });

  const mailOptions = {
    from: `"NextStage Contact" <${authUser}>`,
    to: toEmail,
    subject: `Νέο μήνυμα από ${name}`,
    html: `
      <h2>Νέο μήνυμα από τη φόρμα επικοινωνίας</h2>
      <p><strong>Ονοματεπώνυμο:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Τηλέφωνο:</strong> ${phone || '—'}</p>
      <hr/>
      <p><strong>Μήνυμα:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}
