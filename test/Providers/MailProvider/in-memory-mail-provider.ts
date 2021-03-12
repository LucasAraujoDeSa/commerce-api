import { ISendMail } from './../../../src/Providers/MailProvider/port/ISendMail';
import { IMailProvider } from './../../../src/Providers/MailProvider/models/IMailProvider';

export class InMemoryMailProvider implements IMailProvider {
  private message: ISendMail[] = [];

  public async send(message: ISendMail): Promise<void> {
    this.message.push(message);
  }
}
