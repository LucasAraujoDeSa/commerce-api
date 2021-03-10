import { IUserRepository } from '../../../src/api/repositories/ports/IUser-Repository';
import { IUser } from '../../../src/api/ports/users/user';
import { User } from '../../../src/api/Entitie/User';
import { v4 } from 'uuid';

export class InMemoryUserRepository implements IUserRepository {
  private user: User[] = [];

  public async find(): Promise<User[]> {
    return this.user;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = this.user.find(user => user.id === user_id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.user.find(user => user.email === email);
    return user;
  }

  public async create(data: IUser): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: v4(),
      },
      data,
    );

    this.user.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findUser = this.user.findIndex(user => user.id === user.id);
    this.user[findUser] = user;
    return user;
  }
}
