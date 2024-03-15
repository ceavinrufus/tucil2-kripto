//Extended Vigenere Cipher.js
class ExtendedVigenereCipher {
  constructor(key) {
    this.key = key;
  }

  encrypt(plaintext) {
    let result = "";
    for (let i = 0, j = 0; i < plaintext.length; i++) {
      const plainCharCode = plaintext.charCodeAt(i);
      const keyCharCode = this.key.charCodeAt(j % this.key.length);
      const encryptedCharCode = (plainCharCode + keyCharCode) % 256;
      result += String.fromCharCode(encryptedCharCode);
      j++;
    }
    return result;
  }

  decrypt(ciphertext) {
    let result = "";
    for (let i = 0, j = 0; i < ciphertext.length; i++) {
      const cipherCharCode = ciphertext.charCodeAt(i);
      const keyCharCode = this.key.charCodeAt(j % this.key.length);
      const decryptedCharCode = (cipherCharCode - keyCharCode + 256) % 256;
      result += String.fromCharCode(decryptedCharCode);
      j++;
    }
    return result;
  }
  encryptFile(file) {
    let result = new Uint8Array(file.length);
    for (let i = 0, j = 0; i < file.length; i++) {
      const plainCharCode = file[i];
      const keyCharCode = this.key.charCodeAt(j % this.key.length);
      const encryptedCharCode = (plainCharCode + keyCharCode) % 256;
      result[i] = encryptedCharCode;
      j++;
    }
    return result;
  }

  decryptFile(file) {
    let result = new Uint8Array(file.length);
    for (let i = 0, j = 0; i < file.length; i++) {
      const cipherCharCode = file[i];
      const keyCharCode = this.key.charCodeAt(j % this.key.length);
      const decryptedCharCode = (cipherCharCode - keyCharCode + 256) % 256;
      result[i] = decryptedCharCode;
      j++;
    }
    return result;
  }
}

export default ExtendedVigenereCipher;
