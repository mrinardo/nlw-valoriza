import * as nodemailer from "nodemailer"

class Mailer {
    public mailConfig = {};

    constructor() {

        nodemailer.createTestAccount((err, account) => {
            this.mailConfig = {
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: account.user, // generated ethereal user
                    pass: account.pass  // generated ethereal password
                }
            }
        });
    }

    sendComplimentMail(to: string, sender_name: string, compliment: string, message: string) {
        let email = {
            from: "no-reply@nlwvaloriza.com.br",
            to: to,
            subject: (`Compliment received from ${sender_name}`),
            html: (`<p>Compliment: ${compliment}</p><p>Message: ${message}</p>`)
        };

        const transporter = nodemailer.createTransport(this.mailConfig);

        transporter.sendMail(email, function (error, info) {
            if (error) {
                console.log('Error sending compliment email: ' + error.message);
                return error;
            } else {
                let result = nodemailer.getTestMessageUrl(info).toString();
                console.log(result);
            }
        });
    }

}

export default new Mailer;