export const makeGapBetween = (value: string | undefined) => {
  if (typeof value !== 'string') {
    return;
  }

  const [numbers, letters] = value.split(/(?<=\d)(?=\D)/);

  return `${numbers} ${letters}`;
};
