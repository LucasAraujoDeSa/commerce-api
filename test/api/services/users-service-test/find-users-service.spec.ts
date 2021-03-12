import { FindUsersService } from '../../../../src/api/services/users-service/find-users-service';
import { InMemoryUserRepository } from '../../in-memory-repositories/in-memory-user-repository';

let inMemoryUserRepository: InMemoryUserRepository;
let findUsers: FindUsersService;

describe('Find Users', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    findUsers = new FindUsersService(inMemoryUserRepository);
  });

  it('should be able to return users', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    const user1 = await inMemoryUserRepository.create(data);
    const user2 = await inMemoryUserRepository.create(data);

    const find = await findUsers.execute();

    expect(find).toEqual([user1, user2]);
  });
});
