import { ISendMail } from '../port/ISendMail';

export interface IMailProvider {
  send(mail: ISendMail): Promise<void>;
}
