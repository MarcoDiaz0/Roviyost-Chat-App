import nodemailer from "nodemailer";

// const mailOptions = {
//   from: { name: "Nearby Food", address: process.env.GMAIL }, // sender address
//   to: "", // list of receivers
//   subject: "Hello ✔", // Subject line
//   text: "Hello world?", // plain text body
//   html: "<b>Hello world?</b>", // html body
// };

export const sendMail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "nearbyfoood@gmail.com",
      pass: process.env.NODEMAILER_PASS,
    },
  });
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};
