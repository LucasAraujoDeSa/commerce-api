import { InMemoryUserTokenRepository } from '../../in-memory-repositories/in-memory-user-token-repository';
import { ResetPasswordService } from './../../../../src/api/services/users-service/reset-password-service';
import { InMemoryHashProvider } from './../../../Providers/Hash/in-memory-hash-provider';
import { InMemoryUserRepository } from '../../in-memory-repositories/in-memory-user-repository';
import { AppError } from '../../../../src/errors/AppError';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryUserTokenRepository: InMemoryUserTokenRepository;
let inMemoryHashProvider: InMemoryHashProvider;
let resetPassword: ResetPasswordService;

describe('Reset Password of User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryUserTokenRepository = new InMemoryUserTokenRepository();
    inMemoryHashProvider = new InMemoryHashProvider();
    resetPassword = new ResetPasswordService(
      inMemoryUserRepository,
      inMemoryUserTokenRepository,
      inMemoryHashProvider,
    );
  });

  it('should be able to return reset password of user', async () => {
    const { password, id } = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await inMemoryUserTokenRepository.generate(id);

    const generateHash = jest.spyOn(inMemoryHashProvider, 'encrypter');

    await resetPassword.execute({
      token,
      password,
    });

    const updatedUser = await inMemoryUserRepository.findById(id);

    expect(updatedUser.password).toBe('123456');
    expect(generateHash).toHaveBeenCalledWith(updatedUser.password);
  });

  it('must be able to return error if user does not exist', async () => {
    const { token } = await inMemoryUserTokenRepository.generate(
      'id-not-exist',
    );

    await expect(
      resetPassword.execute({ token, password: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('must be able to return error if token expires', async () => {
    const { password, id } = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await inMemoryUserTokenRepository.generate(id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({ token, password }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
