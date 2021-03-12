import 'reflect-metadata';
import { AppError } from './../../../errors/AppError';
import { inject, injectable } from 'tsyringe';
import { User } from '@/api/Entitie/User';
import { IHash } from './../../../Providers/HashProvider/models/IHash';
import { IUserRepository } from '../../repositories/ports/IUser-Repository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hash: IHash,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not Found', 401);
    }

    const checkEmail = await this.userRepository.findByEmail(email);

    let tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!tester.test(email)) {
      throw new AppError('Email invalid', 401);
    }

    if (checkEmail && checkEmail.id !== user_id) {
      throw new AppError('This email is already used by another user.');
    }

    if (password && !old_password) {
      throw new AppError('You need to inform the current password.');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hash.compare(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Wrong current password.');
      }

      user.password = await this.hash.encrypter(password);
    }

    user.name = name;
    user.email = email;

    return user;
  }
}
