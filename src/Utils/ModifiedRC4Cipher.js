class ModifiedRC4Cipher {
  constructor(key) {
    this.key = key;
  }

  extendedVigenereEncrypt(plaintext, key) {
    let encryptedText = "";
    let keyLength = key.length;
    for (let i = 0; i < plaintext.length; i++) {
      let plaintextCharCode = plaintext.charCodeAt(i);
      let keyCharCode = key.charCodeAt(i % keyLength);
      let encryptedCharCode = (plaintextCharCode + keyCharCode) % 256;
      encryptedText += String.fromCharCode(encryptedCharCode);
    }
    return encryptedText;
  }

  KSA() {
    let extendedKey = this.extendedVigenereEncrypt(this.key, this.key);
    let S = [];
    for (let i = 0; i < 256; i++) {
      S[i] = i;
    }
    let j = 0;
    for (let i = 0; i < 256; i++) {
      j = (j + S[i] + extendedKey.charCodeAt(i % extendedKey.length)) % 256;
      // Swap S[i] and S[j]
      let temp = S[i];
      S[i] = S[j];
      S[j] = temp;
    }
    return S;
  }

  PRGA(S, length) {
    let keyStream = [];
    let i = 0;
    let j = 0;
    for (let k = 0; k < length; k++) {
      i = (i + 1) % 256;
      j = (j + S[i]) % 256;
      // Swap S[i] and S[j]
      let temp = S[i];
      S[i] = S[j];
      S[j] = temp;
      let t = (S[i] + S[j]) % 256;
      let keystreamByte = S[t];
      keyStream.push(keystreamByte);
    }
    return keyStream;
  }

  encrypt(plaintext) {
    let S = this.KSA();
    let keyStream = this.PRGA(S, plaintext.length);
    let ciphertext = "";
    for (let i = 0; i < plaintext.length; i++) {
      // XOR plaintext byte with keystream byte
      let plainCharCode = plaintext.charCodeAt(i);
      let encryptedByte = plainCharCode ^ keyStream[i];
      // Convert encrypted byte to hexadecimal and pad with zeros
      let hex = encryptedByte.toString(16).padStart(2, "0");
      ciphertext += hex;
    }
    return ciphertext;
  }

  decrypt(ciphertext) {
    let S = this.KSA();
    let keyStream = this.PRGA(S, ciphertext.length / 2);
    let plaintext = "";
    for (let i = 0; i < ciphertext.length; i += 2) {
      // Parse two hexadecimal characters to get encrypted byte
      let hexByte = ciphertext.substr(i, 2);
      let encryptedByte = parseInt(hexByte, 16);
      // XOR encrypted byte with keystream byte
      let decryptedByte = encryptedByte ^ keyStream[i / 2];
      // Convert decrypted byte to character
      plaintext += String.fromCharCode(decryptedByte);
    }
    return plaintext;
  }

  encryptFile(file) {
    let S = this.KSA();
    let keyStream = this.PRGA(S, file.length);
    let encryptedFile = new Uint8Array(file.length);
    for (let i = 0; i < file.length; i++) {
      // XOR plaintext byte with keystream byte
      let plainCharCode = file[i];
      let encryptedByte = plainCharCode ^ keyStream[i];
      // Convert encrypted byte to hexadecimal and pad with zeros
      encryptedFile[i] = encryptedByte;
    }
    return encryptedFile;
  }

  decryptFile(file) {
    let S = this.KSA();
    let keyStream = this.PRGA(S, file.length);
    let decryptedFile = new Uint8Array(file.length);
    for (let i = 0; i < file.length; i++) {
      // XOR file byte with keystream byte
      let decryptedByte = file[i] ^ keyStream[i];
      decryptedFile[i] = decryptedByte;
    }
    return decryptedFile;
  }
}

export default ModifiedRC4Cipher;
