import { IMailProvider } from './models/IMailProvider';
import { container } from 'tsyringe';
import { EtheralMailProvider } from './implementation/MailProvider';

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtheralMailProvider),
);
