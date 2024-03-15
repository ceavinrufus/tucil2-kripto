class RC4Cipher {
  constructor(key) {
    this.key = key;
  }

  KSA() {
    let S = [];
    for (let i = 0; i < 256; i++) {
      S[i] = i;
    }
    let j = 0;
    for (let i = 0; i < 256; i++) {
      j = (j + S[i] + this.key.charCodeAt(i % this.key.length)) % 256;
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
      let plainCharCode = plaintext.charCodeAt(i);
      let encryptedByte = plainCharCode ^ keyStream[i];
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
      let hexByte = ciphertext.substr(i, 2);
      let encryptedByte = parseInt(hexByte, 16);
      let decryptedByte = encryptedByte ^ keyStream[i / 2];
      plaintext += String.fromCharCode(decryptedByte);
    }
    return plaintext;
  }
}

export default RC4Cipher;
