import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export const fnUpperFirstLetter = (word: string) => {
  const arr = word.split('-').map(item => (item.includes('gb')
    ? item.replace('gb', 'GB')
    : capitalizeFirstLetter(item)));

  return arr.join(' ');
};
