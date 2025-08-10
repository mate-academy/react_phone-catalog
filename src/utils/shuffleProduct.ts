export function shufflePtoducts<T>(products: T[]): T[] {
  const result = [...products]; // робимо копію масиву, щоб не мутувати оригінал

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]; // міняємо місцями
  }

  return result;
}
