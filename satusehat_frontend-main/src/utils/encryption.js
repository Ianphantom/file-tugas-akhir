// nanti jangan lupa tambahkan test unit
// Tambahin test unit
// Nanti coba tambahin RSA_AES
import forge from "node-forge";

export const generateKeyPair = () => {
  const rsa = forge.pki.rsa;
  const keyPair = rsa.generateKeyPair({ bits: 2048 });
  return {
    publicKey: forge.pki.publicKeyToPem(keyPair.publicKey),
    privateKey: forge.pki.privateKeyToPem(keyPair.privateKey),
  };
};

export const encryptionRSA = (public_key, signatureKey) => {
  const publicKeyObject = forge.pki.publicKeyFromPem(public_key);
  const data = signatureKey;
  const dataBytes = forge.util.encodeUtf8(data);
  const encryptedBytes = publicKeyObject.encrypt(dataBytes, "RSA-OAEP", {
    md: forge.md.sha256.create(),
    mgf1: forge.mgf1.create(),
  });

  const encryptedData = forge.util.encode64(encryptedBytes);

  return encryptedData;
};

export const decryptionRSA = (privateKey, signatureKey) => {
  const privateKeyObject = forge.pki
    .privateKeyFromPem(`-----BEGIN RSA PRIVATE KEY-----
      ${privateKey}
      -----END RSA PRIVATE KEY-----`);
  const encryptedBytes1 = forge.util.decode64(signatureKey);

  // Decrypt the encrypted bytes using the private key
  const decryptedBytes = privateKeyObject.decrypt(encryptedBytes1, "RSA-OAEP", {
    md: forge.md.sha256.create(),
    mgf1: forge.mgf1.create(),
  });

  // Convert the decrypted bytes to a string
  const decryptedData = forge.util.decodeUtf8(decryptedBytes);
  return decryptedData;
};
