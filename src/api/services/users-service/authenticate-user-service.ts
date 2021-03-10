import 'reflect-metadata';
import { IHash } from './../../../Providers/HashProvider/models/IHash';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { IUserRepository } from '@/api/repositories/ports/IUser-Repository';
import { AppError } from '@/errors/AppError';
import authConfig from '@/config/authConfig';
import { User } from '@/api/Entitie/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hash: IHash,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('email/pasword error');
    }

    let tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!tester.test(email)) {
      throw new AppError('Email invalid', 401);
    }

    const passwordMatched = await this.hash.compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('email/pasword error');
    }

    const { expireIn, secret } = authConfig.jwt;

    user.password = '';

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expireIn,
    });

    return { user, token };
  }
}
