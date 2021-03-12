import { AppError } from './../../../../src/errors/AppError';
import { UpdateUserService } from './../../../../src/api/services/users-service/update-user-service';
import { InMemoryUserRepository } from '../../in-memory-repositories/in-memory-user-repository';
import { InMemoryHashProvider } from './../../../Providers/Hash/in-memory-hash-provider';

let inMemoryHashProvider: InMemoryHashProvider;
let inMemoryUserRepository: InMemoryUserRepository;
let updateUser: UpdateUserService;

describe('Updated User', () => {
  beforeEach(() => {
    inMemoryHashProvider = new InMemoryHashProvider();
    inMemoryUserRepository = new InMemoryUserRepository();
    updateUser = new UpdateUserService(
      inMemoryUserRepository,
      inMemoryHashProvider,
    );
  });

  it('should be able to return updated user', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    const updatedUser = await updateUser.execute({
      user_id: user.id,
      name: 'John Roe',
      password: '123123',
      old_password: '123456',
      email: 'johnroe@example.com',
    });

    expect(updatedUser.name).toBe('John Roe');
    expect(updatedUser.email).toBe('johnroe@example.com');
  });

  it('should not be able to update user without user_id', async () => {
    await expect(
      updateUser.execute({
        user_id: 'id-no-exist',
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user if the password is wrong', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'John Roe',
        email: 'johnroe@example.com',
        password: '123123',
        old_password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user if email is in use', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'John Roe',
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user if the email is invalid', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'John Roe',
        email: 'invalid-email',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user without the first part of the email', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'John Roe',
        email: '@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user without the second part of the email', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'John Roe',
        email: 'johnroe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
