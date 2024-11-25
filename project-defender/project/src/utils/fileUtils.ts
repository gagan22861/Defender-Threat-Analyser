import { createMD5, createSHA256 } from 'hash-wasm';

export const calculateFileSignature = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const md5Instance = await createMD5();
  const sha256Instance = await createSHA256();

  md5Instance.init();
  sha256Instance.init();

  md5Instance.update(new Uint8Array(arrayBuffer));
  sha256Instance.update(new Uint8Array(arrayBuffer));

  return {
    md5: md5Instance.digest(),
    sha256: sha256Instance.digest(),
  };
};