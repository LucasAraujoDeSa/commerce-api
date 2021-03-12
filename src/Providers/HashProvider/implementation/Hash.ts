import { IHash } from '../models/IHash';
import { hash, verify } from 'argon2';

export class Hash implements IHash {
  async encrypter(plaintext: string): Promise<string> {
    return hash(plaintext, { hashLength: 50 });
  }

  async compare(hash: string, plaintext: string): Promise<boolean> {
    return verify(hash, plaintext, { hashLength: 50 });
  }
}
