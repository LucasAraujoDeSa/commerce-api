import { container } from 'tsyringe';

import '@/Providers/MailProvider/index';
import '@/Providers/HashProvider/index';

import { IUserRepository } from '@/api/repositories/ports/IUser-Repository';
import { UserRepository } from '@/api/repositories/user-repository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

import { IProductRepository } from './../api/repositories/ports/IProduct-Repository';
import { ProductRepository } from 'api/repositories/product-repository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

import { UserTokensRepository } from '@/api/repositories/user-tokens-repository';
import { ITokenRepository } from '@/api/repositories/ports/IToken-Repository';

container.registerSingleton<ITokenRepository>(
  'UserTokenRepository',
  UserTokensRepository,
);
