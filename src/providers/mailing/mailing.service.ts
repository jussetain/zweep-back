import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(username: string, email: string, token: string) {
        const url = `https://zweep.co/auth/confirm?token=${token}`;
        try {
            await this.mailerService.sendMail({
                to: email,
                // from: '"Support Team" <support@example.com>', // override default from
                subject: '☝️🤓 Confirmez votre inscription',
                template: './activateAccount', // `.hbs` extension is appended automatically
                context: { // ✏️ filling curly brackets with content
                    name: username,
                    url,
                },
            });
        } catch (err) {
            console.error(err);
        }

    }
}
