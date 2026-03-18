import { capitalizeWord } from './capitalizeWord';

export const slugToTitle = (text: string) => {
  const SEPARATOR = '-';
  const SPACE = ' ';

  const parts = text.split(SEPARATOR);

  const capitalizedParts = parts.map(part => capitalizeWord(part));

  return capitalizedParts.join(SPACE);
};
