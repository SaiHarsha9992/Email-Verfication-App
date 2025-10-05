import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org", // Mailgun SMTP server
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.MG_USER, // postmaster@sandboxXXXX.mailgun.org
      pass: process.env.MG_PASS, // Mailgun SMTP password
    },
  });

  await transporter.sendMail({
    from: `"Verify App" <${process.env.MG_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;
