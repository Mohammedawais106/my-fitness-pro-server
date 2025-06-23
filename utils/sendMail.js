import nodemailer from "nodemailer"

export let sendEmail = async (option) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT), // ✅ Convert to number
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: option.email,
        subject: option.subject,
        text: `Name:${option.name},Mobile Number:${option.mobile},Message:${option.message}, Email of Sender: ${option.userEmail}`
    }

    await transporter.sendMail(mailOptions)
}
