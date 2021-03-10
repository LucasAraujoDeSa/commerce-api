import { IUser } from '../../ports/users/user';
import { User } from '../../Entitie/User';

export interface IUserRepository {
  find(): Promise<User[]>;
  findById(user_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IUser): Promise<User>;
  save(data: IUser): Promise<User>;
}
