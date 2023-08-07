import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

class Service {
    transporter

    //Отправка на почту пользователя ссылки
    //для активации аккаунта
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.SMTP_HOST,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            secure: false,
        })
    }

    async sendActivationMail(to: string, link: string) {
        const response = await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на сайте' + process.env.API_URL,
            html: `
                <div>
                    <h1>Для активации перейдите по ссылке ниже</h1>
                    <a href="${link}">${link}</a>
                </div>
            `,
        })

        return response
    }
}

export const MailService = new Service()
