import { UserToken } from './../../Entitie/UserToken';
export interface ITokenRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
