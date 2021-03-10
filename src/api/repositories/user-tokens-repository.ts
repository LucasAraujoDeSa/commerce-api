import { getRepository, Repository } from 'typeorm';
import { UserToken } from '../Entitie/UserToken';
import { ITokenRepository } from './ports/IToken-Repository';

export class UserTokensRepository implements ITokenRepository {
  private readonly ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }
}
