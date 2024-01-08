export const formatTotal = (total: number, word: string) => {
  return `${total} ${total > 1 ? `${word}s` : word}`;
};
