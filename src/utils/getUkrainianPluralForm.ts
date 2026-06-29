export const getUkrainianPluralForm = (count: number) => {
  const TEN = 10;
  const HUNDRED = 100;
  const FEW_MIN = 2;
  const FEW_MAX = 4;

  const mod10 = count % TEN;
  const mod100 = count % HUNDRED;

  if (mod10 === 1 && mod100 !== 11) {
    return 'one';
  }

  if (mod10 >= FEW_MIN && mod10 <= FEW_MAX && (mod100 < 12 || mod100 > 14)) {
    return 'few';
  }

  return 'many';
};
