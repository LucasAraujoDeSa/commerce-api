import 'reflect-metadata';
import { AppError } from '@/errors/AppError';
import { ITokenRepository } from './../../repositories/ports/IToken-Repository';
import { IUserRepository } from '@/api/repositories/ports/IUser-Repository';
import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';
import { IHash } from '@/Providers/HashProvider/models/IHash';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
export class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokensRepository: ITokenRepository,
    @inject('HashProvider')
    private hash: IHash,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token not found', 401);
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await this.hash.encrypter(password);

    await this.userRepository.save(user);
  }
}
