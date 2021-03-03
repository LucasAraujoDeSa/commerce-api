export interface IHash {
  encrypter: (plaintext: string) => Promise<string>;
  compare: (hash: string, plaintext: string) => Promise<boolean>;
}
