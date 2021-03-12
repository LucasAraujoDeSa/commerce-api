import { IMailProvider } from './../models/IMailProvider';
import { ISendMail } from './../port/ISendMail';
import nodemailer, { Transporter } from 'nodemailer';

export class EtheralMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    nodemailer.createTestAccount().then(account => {
      const trasnporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = trasnporter;
    });
  }

  public async send({ to, from, subject }: ISendMail): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from.name || 'Equipe Vickthopia Store',
        address: from.email || 'contato@vickthopiastore@gmail.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
    });

    console.log('Message sent: %S', message.messageId);
    console.log('Preview URL: %S', nodemailer.getTestMessageUrl(message));
  }
}
