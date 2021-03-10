import { AppError } from './../../../../src/errors/AppError';
import { InMemoryHashProvider } from './../../../Providers/Hash/in-memory-hash-provider';
import { CreateUserService } from '../../../../src/api/services/users-service/create-user-service';
import { InMemoryUserRepository } from '../../in-memory-repositories/in-memory-user-repository';

let inMemoryUserRepository: InMemoryUserRepository;
let createUser: CreateUserService;
let inMemoryHashProvider: InMemoryHashProvider;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryHashProvider = new InMemoryHashProvider();
    createUser = new CreateUserService(
      inMemoryUserRepository,
      inMemoryHashProvider,
    );
  });

  it('should be able to create new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should NOT NOT be able to create a user with an existing email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create user without @ in the email', async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'invalid_email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create user without .com in the email', async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'invalid_email@example',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a user without the first part of the email', async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: '@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user without the second part of the email', async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
