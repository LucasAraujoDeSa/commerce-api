import { getRepository, Repository } from 'typeorm';
import { IUser } from '../ports/users/user';
import { User } from '../Entitie/User';

export class UserRepository {
  private readonly ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: email,
    });

    return user;
  }

  async create(data: IUser): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  async find(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }
}
