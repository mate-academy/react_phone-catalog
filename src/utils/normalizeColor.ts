export function normalizeColor(input: string): string {
  const words = input.trim().split(' ');

  return words.length === 2 ? `${words[0]}-${words[1]}` : input;
}
