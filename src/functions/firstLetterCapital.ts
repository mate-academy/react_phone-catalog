export const firstLetterCapital = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).replaceAll('-', ' ');
};
