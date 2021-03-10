import { UserToken } from '../../../src/api/Entitie/UserToken';
import { v4 } from 'uuid';
import { ITokenRepository } from '../../../src/api/repositories/ports/IToken-Repository';

export class InMemoryUserTokenRepository implements ITokenRepository {
  private token: UserToken[] = [];

  public async findByToken(token: string): Promise<UserToken> {
    const findToken = this.token.find(find => find.token === token);
    return findToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: v4(),
      token: v4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.token.push(userToken);

    return userToken;
  }
}
