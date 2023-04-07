import { Color } from '../types/Color';
import { Phone } from '../types/Phone';
import { Capacity } from '../types/Capacity';

export const background = (color: keyof typeof Color): any => {
  return {
    backgroundColor: Color[`${color}`],
  };
};

export const capitalize
= (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

export const phoneByColor = (
  color: keyof typeof Color,
  name: string,
  phones: Phone[],
): string | undefined => {
  const nameMinusColor
  = name.includes('Midnight green')
    ? name.split(' ').slice(0, -2)
    : name.split(' ').slice(0, -1);
  const nameWithColor
  = color === 'midnightgreen'
    ? [...nameMinusColor, 'Midnight green'].join(' ')
    : [...nameMinusColor, capitalize(color)].join(' ');
  const phoneWithNewColor = phones.find(phone => phone.name === nameWithColor);

  return phoneWithNewColor?.id;
};

export const phoneByCapacity = (
  capacity: Capacity,
  name: string,
  phones: Phone[],
): string | undefined => {
  const baseName
  = name.includes('Midnight green')
    ? name.split(' ').slice(0, -3)
    : name.split(' ').slice(0, -2);

  baseName.push(capacity);

  const fullName
  = name.includes('Midnight green')
    ? [...baseName, 'Midnight green'].join(' ')
    : [...baseName, name.split(' ').slice(-1)].join(' ');

  const phoneWithNewCapacity
  = phones.find(phone => phone.name === fullName);

  return phoneWithNewCapacity?.id;
};

export const randomSequence = <A>(someArr: A[]): A[] => {
  const indexNum = someArr.length;
  const indexArr: number[] = [];

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  do {
    const generated = getRandomInt(indexNum);

    if (!indexArr.includes(generated)) {
      indexArr.push(generated);
    }
  } while (indexArr.length < indexNum);

  return indexArr.map(index => someArr[index]);
};
