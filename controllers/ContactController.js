const Validate = require("../config/validate");
const transporter = require("../config/nodemailer");

class ContactController {

    static index = async (req, res, next) => {
        try {
            await Validate(req.body, {
                name: 'string|required|alpha|minLength:2|maxLength:20',
                themes: 'string|minLength:3|maxLength:20',
                email: 'required|email',
                message: 'required|string|minLength:4|maxLength:100',
            })
            const {name, email, themes, message} = req.body;
            let Info = `
                 <div style="width: 80%;height:100%;margin: 0 auto;color: black;">
                    <div style="width: 100%;height: 80px;font-weight: bold;font-size: 50px;
                    background: black;color: #ba0101;margin: 0 auto 50px;font-family: monospace;
                    text-align: center;">Kars&Manex</div>
                    <h1 style="margin: 0 0 50px 0;text-align: center;">Ուղարկող ${name}</h1>
                    <strong style="margin: 0 0 10px 100px">Թեման ${themes}</strong>
                     <p style="word-break: break-word;margin: 0 0 30px 0;text-align: center;">${message}</p>
                     <a style="width:30%;padding: 8px 20px;background: green;font-weight: bold;
                    text-align: center;color:white;margin: 0 auto 30px;display: block;
                    border-radius: 5px;text-decoration: none;box-shadow: 1px 1px 5px black"
                     href="mailto:${email.toLowerCase()}" title="${email.toLowerCase()}">
                     Պատասխանել՝  ${email.toLowerCase().slice(0, 30).concat("...")}</a>
                     <i style="margin: 0 0 10px 100px;display: block">Հարգանքներով</i>
                     <strong style="margin: 0 0 0 100px">Team Kars&Manex</strong>
                </div>
            `
            await transporter.sendMail({
                from: '"Kars&Manex" <karsmanex.contact@mail.ru>',
                to: 'karsmanex@gmail.com',
                subject: "Kars&Manex - Օգտատերի հարցում",
                text: Info,
                html: Info,
            });
            res.json({
                status: 'Ձեր նամակը հաջողությամբ ուղարկված է',
            });
        } catch (e) {
            next(e);
        }
    }

}

module.exports = ContactController;
