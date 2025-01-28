import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('appConfig.mailHost'),
          secure: false,
          port: config.get('appConfig.mailPort'),
          auth: {
            user: config.get('appConfig.smptUsername'),
            pass: config.get('appConfig.smptPassword')
          }
        },
        default: {
          from: `My Blog <no-reply@nestjs.com>`
        },
        template: {
          dir: join(__dirname, "templates"),
          adapter: new EjsAdapter({
            inlineCssEnabled: true
          }),
          options: {
            strict: false
          }
        }
      })
    })
  ]
})
export class MailModule { }
