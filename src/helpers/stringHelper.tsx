export const getCapitalizationFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

export const getNolmalizedTitle = (title: string) => {
  if (title === 'phones') {
    return 'Mobile phones';
  }

  return getCapitalizationFirstLetter(title);
};
