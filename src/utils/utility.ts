export const firstLetterCap = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
