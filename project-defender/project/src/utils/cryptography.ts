import CryptoJS from 'crypto-js';
import { SignJWT, generateKeyPair } from 'jose';

// Generate a secure key for encryption
const ENCRYPTION_KEY = CryptoJS.lib.WordArray.random(256/8);

export const encryptFile = async (file: File): Promise<ArrayBuffer> => {
  const arrayBuffer = await file.arrayBuffer();
  const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
  
  // Encrypt the file content
  const encrypted = CryptoJS.AES.encrypt(wordArray, ENCRYPTION_KEY, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
};

export const decryptFile = (encryptedData: string): ArrayBuffer => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  
  return decrypted.toString(CryptoJS.enc.Utf8);
};

// Generate RSA key pair for secure communication
export const generateSecureKeyPair = async () => {
  const { publicKey, privateKey } = await generateKeyPair('RS256');
  return { publicKey, privateKey };
};

// Sign data with JWT for secure transmission
export const signData = async (data: any, privateKey: any) => {
  const jwt = await new SignJWT(data)
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(privateKey);
  return jwt;
};