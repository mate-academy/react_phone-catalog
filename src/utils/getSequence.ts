export function getSequence(from: number, to: number): number[] {
  const sequence = [];

  for (let n = from; n <= to; n++) {
    sequence.push(n);
  }

  return sequence;
}
