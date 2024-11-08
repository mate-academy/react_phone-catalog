import { IDescription } from '@utils/types/description.interface';

export const getUpperCaseFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const convertToMB = (value: string) => {
  const unit = value.slice(-2);
  const number = parseFloat(value);

  if (unit === 'GB') {
    return number * 1024;
  }

  return number;
};

export const sliceText = (description: IDescription[]) =>
  description.map(item => {
    const combinedText = item.text.join('<br/><br/>');

    return {
      title: item.title,
      text: combinedText,
    };
  });
