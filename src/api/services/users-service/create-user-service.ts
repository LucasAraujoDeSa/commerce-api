import 'reflect-metadata';
import { IHash } from './../../../Providers/HashProvider/models/IHash';
import { AppError } from './../../../errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/ports/IUser-Repository';
import { User } from '../../entitie/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('Hash')
    private hash: IHash,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const exists = await this.userRepository.findByEmail(email);

    if (exists) {
      throw new AppError('Email in user', 401);
    }

    let tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!tester.test(email)) {
      throw new AppError('Email invalid', 401);
    }

    const hashPassword = await this.hash.encrypter(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await this.userRepository.save(user);

    return user;
  }
}
