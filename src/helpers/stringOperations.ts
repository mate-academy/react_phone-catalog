export const capitalizeString = (word: string) => {
  return `${word.at(0)?.toUpperCase()}${word.slice(1)}`;
};
