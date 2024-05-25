import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailingService } from 'providers/mailing/mailing.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: process.env.ORACLE_SMTP_SERVER,
          secure: true,
          auth: {
            user: process.env.ORACLE_SMTP_USERNAME,
            pass: process.env.ORACLE_SMTP_PASSWORD,
          },
        },
        defaults: {
          from: '"Zweep" <no-reply@zweep.co>',
        },
        template: {
          dir: join(__dirname, '../../templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailingService],
  exports: [MailingService], // 👈 export for DI
})

export class MailingModule { }
