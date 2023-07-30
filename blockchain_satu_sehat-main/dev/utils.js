const forge = require("node-forge");

exports.encryptionRSA = (public_key, signatureKey) => {
  const publicKeyObject = forge.pki.publicKeyFromPem(public_key);
  const buffer = forge.util.createBuffer(signatureKey, "utf8");
  const encryptedBuffer = publicKeyObject.encrypt(
    buffer.getBytes(),
    "RSA-OAEP",
    {
      md: forge.md.sha256.create(),
    }
  );

  const encryptedData = forge.util.encode64(encryptedBuffer);

  return encryptedData;
};
