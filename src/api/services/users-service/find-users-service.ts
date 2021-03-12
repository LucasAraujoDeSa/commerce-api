import 'reflect-metadata';
import { IUserRepository } from '../../repositories/ports/IUser-Repository';
import { inject, injectable } from 'tsyringe';
import { User } from '@/api/Entitie/User';

@injectable()
export class FindUsersService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }
}
