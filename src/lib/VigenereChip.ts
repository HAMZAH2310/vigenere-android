const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";

class VigenereCipher {
  private key: string;

  constructor(key: string) {
    this.key = key.toUpperCase();
  }

  private extendKey(text: string): string {
    let extendedKey = "";
    for (let i = 0; i < text.length; i++) {
      extendedKey += this.key[i % this.key.length];
    }
    return extendedKey;
  }

  public encrypt(plainText: string): string {
    plainText = plainText.toUpperCase();
    const extendedKey = this.extendKey(plainText);
    let cipherText = "";

    for (let i = 0; i < plainText.length; i++) {
      const pIndex = CHARSET.indexOf(plainText[i]);
      const kIndex = CHARSET.indexOf(extendedKey[i]);

      if (pIndex === -1 || kIndex === -1) {
        cipherText += plainText[i]; // Biarkan karakter yang tidak termasuk CHARSET
      } else {
        const cIndex = (pIndex + kIndex) % CHARSET.length;
        cipherText += CHARSET[cIndex];
      }
    }

    return cipherText;
  }

  public decrypt(cipherText: string): string {
    cipherText = cipherText.toUpperCase();
    const extendedKey = this.extendKey(cipherText);
    let plainText = "";

    for (let i = 0; i < cipherText.length; i++) {
      const cIndex = CHARSET.indexOf(cipherText[i]);
      const kIndex = CHARSET.indexOf(extendedKey[i]);

      if (cIndex === -1 || kIndex === -1) {
        plainText += cipherText[i];
      } else {
        const pIndex = (cIndex - kIndex + CHARSET.length) % CHARSET.length;
        plainText += CHARSET[pIndex];
      }
    }

    return plainText;
  }
}

export default VigenereCipher;
