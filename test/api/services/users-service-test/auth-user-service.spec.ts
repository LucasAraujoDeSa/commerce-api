import { AppError } from '../../../../src/errors/AppError';
import { AuthenticateUserService } from '../../../../src/api/services/users-service/authenticate-user-service';
import { InMemoryHashProvider } from './../../../Providers/Hash/in-memory-hash-provider';
import { InMemoryUserRepository } from '../../in-memory-repositories/in-memory-user-repository';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryHashProvider: InMemoryHashProvider;
let authUser: AuthenticateUserService;

describe('Authentica User', () => {
  beforeEach(() => {
    inMemoryHashProvider = new InMemoryHashProvider();
    inMemoryUserRepository = new InMemoryUserRepository();
    authUser = new AuthenticateUserService(
      inMemoryUserRepository,
      inMemoryHashProvider,
    );
  });

  it('should be able to return user authenticate', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '13456',
    });

    const response = await authUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate a user with an incorrect password', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authUser.execute({
        email: user.email,
        password: 'incorrect-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with an incorrect email', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authUser.execute({
        email: 'incorrect-email',
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user without the first part of the email', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'Jhon Doe',
      email: '@example.com',
      password: '123456',
    });

    await expect(
      authUser.execute({
        email: user.email,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user without the second part of the email', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe',
      password: '123456',
    });

    await expect(
      authUser.execute({
        email: user.email,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
