import { IUser } from './../../ports/users/user';
import { User } from '../../entitie/User';
import { UserRepository } from '../../repositories/user-repository';
import { IHash } from '@/Providers/HashProvider/models/IHash';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository, private hash: IHash) {}

  public async execute({
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User> {
    const exists = await this.userRepository.findByEmail(email);

    if (!exists) {
      return exists;
    }

    const hashPassword = await this.hash.encrypter(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashPassword,
      avatar,
    });

    return user;
  }
}
