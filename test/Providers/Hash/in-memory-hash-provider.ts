import { IHash } from './../../../src/Providers/HashProvider/models/IHash';

export class InMemoryHashProvider implements IHash {
  public async encrypter(plainText: string): Promise<string> {
    return plainText;
  }
  public async compare(hashed: string, plainText: string): Promise<boolean> {
    return hashed === plainText;
  }
}
