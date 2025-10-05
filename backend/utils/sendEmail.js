import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.MG_USER, 
      pass: process.env.MG_PASS,
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
