//aлгоритм тасування Фішера-Єйтса.
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // випадковий індекс від 0 до i

    // поміняти елементи місцями
    // те ж саме можна записати як:
    // let t = array[i]; array[i] = array[j]; array[j] = t

    /* eslint-disable no-param-reassign */
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
