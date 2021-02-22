import nodemailer from "nodemailer";

const sendMail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '1111@gmail.com', // generated ethereal user
            pass: '1111', // generated ethereal password
        },
    });

    await transporter.sendMail(mailOptions);
};


export default sendMail;
