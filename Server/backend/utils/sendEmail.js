const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    console.log(options);
    const transport = nodeMailer.createTransport({

        service: "gmail",
        auth: {
            user:"safaabbas167@gmail.com",
            pass: "hhgu cols qnzy xoob"
        },
    });
    const mailOption = {
        from: "safaabbas167@gmail.com",
        to: options.email,
        subject: options.subject,
        html:options.message,
    }
    await transport.sendMail(mailOption);
};
module.exports = sendEmail;

