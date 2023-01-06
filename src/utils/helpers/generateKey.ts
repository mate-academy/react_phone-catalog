export function generateKey(pre: string | string[]) {
  return `${pre.toString()}_${new Date().getTime()}`;
}
