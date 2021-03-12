import { IHash } from './models/IHash';
import { Hash } from './implementation/Hash';
import { container } from 'tsyringe';

container.registerSingleton<IHash>('HashProvider', Hash);
