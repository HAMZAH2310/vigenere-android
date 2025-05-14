class VigenereCipher {
  private key: string;

  constructor(key: string) {
    this.key = key.toUpperCase();
  }

  private extendKey(text: string): string {
    let extendedKey = "";
    for (let i = 0, j = 0; i < text.length; i++) {
      const currentChar = text[i].toUpperCase();
      if (/[A-Z0-9]/.test(currentChar)) {
        extendedKey += this.key[j % this.key.length].toUpperCase();
        j++;
      } else {
        extendedKey += text[i]; // spasi/simbol
      }
    }
    return extendedKey;
  }

  public encrypt(plainText: string): string {
    const extendedKey = this.extendKey(plainText);
    let cipherText = "";

    for (let i = 0; i < plainText.length; i++) {
      const char = plainText[i];
      const keyChar = extendedKey[i];

      if (/[A-Z]/i.test(char)) {
        const charCode = ((char.toUpperCase().charCodeAt(0) - 65 + (keyChar.charCodeAt(0) - 65)) % 26) + 65;
        cipherText += char === char.toLowerCase()
          ? String.fromCharCode(charCode).toLowerCase()
          : String.fromCharCode(charCode);
      } else if (/[0-9]/.test(char)) {
        const shift = (keyChar.charCodeAt(0) % 10); // shift by 0–9
        const encryptedDigit = (parseInt(char) + shift) % 10;
        cipherText += encryptedDigit.toString();
      } else {
        cipherText += char;
      }
    }

    return cipherText;
  }

  public decrypt(cipherText: string): string {
    const extendedKey = this.extendKey(cipherText);
    let plainText = "";

    for (let i = 0; i < cipherText.length; i++) {
      const char = cipherText[i];
      const keyChar = extendedKey[i];

      if (/[A-Z]/i.test(char)) {
        const charCode = ((char.toUpperCase().charCodeAt(0) - 65 - (keyChar.charCodeAt(0) - 65) + 26) % 26) + 65;
        plainText += char === char.toLowerCase()
          ? String.fromCharCode(charCode).toLowerCase()
          : String.fromCharCode(charCode);
      } else if (/[0-9]/.test(char)) {
        const shift = (keyChar.charCodeAt(0) % 10);
        const decryptedDigit = (parseInt(char) - shift + 10) % 10;
        plainText += decryptedDigit.toString();
      } else {
        plainText += char;
      }
    }

    return plainText;
  }
}

export default VigenereCipher;
