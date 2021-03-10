import { IUserRepository } from './ports/IUser-Repository';
import { getRepository, Repository } from 'typeorm';
import { IUser } from '../ports/users/user';
import { User } from '../Entitie/User';

export class UserRepository implements IUserRepository {
  private readonly ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  async create(data: IUser): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

  async save(data: IUser): Promise<User> {
    return await this.ormRepository.save(data);
  }

  async find(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }
}
