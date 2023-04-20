import { Color } from '../types/Color';
import { Phone } from '../types/Phone';
import { Capacity } from '../types/Capacity';

export const background
= (color: keyof typeof Color): { backgroundColor: string } => {
  return {
    backgroundColor: Color[`${color}`],
  };
};

export const capitalize
= (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

export const phoneByColor = (
  color: keyof typeof Color,
  name = '',
  phones: Phone[],
): string | undefined => {
  const nameMinusColor = name.split('-').slice(0, -1);
  const nameWithColor = [...nameMinusColor, color].join('-');
  const phoneWithNewColor
  = phones.find(phone => phone.phoneId === nameWithColor);

  return phoneWithNewColor?.id;
};

export const phoneByCapacity = (
  capacity: Capacity,
  id = '',
  phones: Phone[],
): string | undefined => {
  const baseName = id.split('-').slice(0, -2);

  baseName.push(`${capacity.slice(0, -2)}gb`);

  const fullName = [...baseName, id.split('-').slice(-1)].join('-');

  const phoneWithNewCapacity
  = phones.find(phone => phone.phoneId === fullName);

  return phoneWithNewCapacity?.id;
};

export const randomSequence = <A>(initial: A[]): A[] => {
  const indexNum = initial.length;
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

  return indexArr.map(index => initial[index]);
};
