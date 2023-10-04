export const toUpperCaseFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const toLowerCaseFirstLetter = (word: string) => {
  return word.charAt(0).toLowerCase() + word.slice(1);
};
