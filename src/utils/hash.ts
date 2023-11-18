/* eslint-disable no-bitwise */
export function getHash(string: string) {
  let hash = 0;

  if (string.length === 0) {
    return hash;
  }

  for (let i = 0; i < string.length; i += 1) {
    const ch = string.charCodeAt(i);

    hash = (hash << 5) - hash + ch;

    hash &= hash;
  }

  return hash;
}
