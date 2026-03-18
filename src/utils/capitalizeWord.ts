export const capitalizeWord = (word: string) => {
  if (!word) {
    return '';
  }

  const FIRST_INDEX = 0;
  const REST_START_INDEX = 1;

  const firstLetter = word[FIRST_INDEX].toUpperCase();
  const restOfWord = word.slice(REST_START_INDEX);

  return firstLetter + restOfWord;
};
