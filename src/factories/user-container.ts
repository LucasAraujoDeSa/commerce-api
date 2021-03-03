import { IHash } from '../Providers/HashProvider/models/IHash';
import { UserRepository } from 'api/repositories/user-repository';
import { CreateUserService } from '@/api/services/users-service/create-user-service';

export const createUserContainer = (): CreateUserService => {
  const userRepository = new UserRepository();
  let hash: IHash;
  const createUserService = new CreateUserService(userRepository, hash);
  return createUserService;
};
