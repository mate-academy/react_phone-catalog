export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}


export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
