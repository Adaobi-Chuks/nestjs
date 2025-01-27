import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService
    ) {}

    public async sendUserWelcome(user: User) {
        console.log(user.firstName)
        await this.mailerService.sendMail({
            to: user.email,
            from: `Onboarding Team <support@nestjsblog.com>`,
            subject: 'Welcome to our platform',
            template: './welcome',
            context: {
                name: user.firstName,
                email: user.email,
                loginUrl: 'http://localhost:3000'
            }
        })
    }
}
