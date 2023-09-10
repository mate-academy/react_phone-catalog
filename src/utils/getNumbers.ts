export function getNumbers(to: number, from?: number) {
  const arr = [];

  if (from) {
    for (let i = from; i <= to; i += 1) {
      arr.push(i);
    }
  } else {
    for (let i = 0; i < to; i += 1) {
      arr.push(i);
    }
  }

  return arr;
}
