export {};

declare global {
  interface Window {
    Go: {
      new (): GoInstance;
    };

    encryptAES(plaintext: string): string;

    decryptAES(ciphertext: string): string;
  }
}

interface GoInstance {
  importObject: WebAssembly.Imports;
  run(instance: WebAssembly.Instance): Promise<void>;
}
