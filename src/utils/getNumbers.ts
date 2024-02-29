export const getNumbers = (yourNumber: number) => {
  return Array.from({ length: yourNumber }, (_, index) => index + 1);
};
