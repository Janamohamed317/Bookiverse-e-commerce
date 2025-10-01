const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


const sendEmail = async (subject, email, body) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: body,
    });
}

module.exports = {
    sendEmail
}