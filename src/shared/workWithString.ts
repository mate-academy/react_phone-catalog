export const addSpaceInText = (text: string): string => {
  let newTextLine = '';

  for (let i = 0; i < text.length; i += 1) {
    if (
      Number(text[i - 1]) &&
      text[i].toLowerCase() !== text[i].toUpperCase()
    ) {
      newTextLine += ' ';
    }

    newTextLine += text[i];
  }

  return newTextLine;
};
