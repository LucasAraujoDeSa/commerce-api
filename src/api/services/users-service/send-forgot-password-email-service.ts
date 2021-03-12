import 'reflect-metadata';
import { IMailProvider } from './../../../Providers/MailProvider/models/IMailProvider';
import { ITokenRepository } from './../../repositories/ports/IToken-Repository';
import { IUserRepository } from '@/api/repositories/ports/IUser-Repository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@/errors/AppError';

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokensRepository: ITokenRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.send({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: `Recuperação de Senha ${token}`,
    });
  }
}
