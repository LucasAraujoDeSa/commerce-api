import { InMemoryMailProvider } from './../../../Providers/MailProvider/in-memory-mail-provider';
import { InMemoryUserTokenRepository } from '../../in-memory-repositories/in-memory-user-token-repository';
import { SendForgotPasswordEmailService } from './../../../../src/api/services/users-service/send-forgot-password-email-service';
import { InMemoryUserRepository } from '../../in-memory-repositories/in-memory-user-repository';
import { AppError } from '../../../../src/errors/AppError';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryUserTokenRepository: InMemoryUserTokenRepository;
let inMemoryMailProvider: InMemoryMailProvider;
let sendMailService: SendForgotPasswordEmailService;

describe('Send Forgot Password User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryUserTokenRepository = new InMemoryUserTokenRepository();
    inMemoryMailProvider = new InMemoryMailProvider();
    sendMailService = new SendForgotPasswordEmailService(
      inMemoryUserRepository,
      inMemoryUserTokenRepository,
      inMemoryMailProvider,
    );
  });

  it('should be able return mail for reset password user', async () => {
    const sendMail = jest.spyOn(inMemoryMailProvider, 'send');
    const { email } = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johdoe@example.com',
      password: '123456',
    });

    await sendMailService.execute(email);

    expect(sendMail).toBeCalled();
  });

  it('should be able to return error if email is incorrect', async () => {
    await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      sendMailService.execute('invalid-email'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('must be able to generate the users token', async () => {
    const generateToken = jest.spyOn(inMemoryUserTokenRepository, 'generate');

    const { id, email } = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendMailService.execute(email);

    expect(generateToken).toBeCalledWith(id);
  });
});
