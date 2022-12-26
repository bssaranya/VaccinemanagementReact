import CryptoJS from 'crypto-js';

// function for encrypt the password
export const encrypt = (password) => {
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(password),
    'my-secret-key@123'
  ).toString();
  return ciphertext;
};

// function for decrypt the password
export const decrypt = async (password) => {
  var bytes = CryptoJS.AES.decrypt(password, 'my-secret-key@123');
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
};
