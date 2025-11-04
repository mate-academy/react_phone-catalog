export const getText = (text: string, data: string) => {
  const textList: string[] = text.split(' ');
  const temporary = textList.find(el => el.includes('$')) || null;

  if (temporary) {
    const index: number = textList.indexOf(temporary);

    textList.splice(index, 1, data);
  }

  const result = textList.join(' ');

  return result;
};
