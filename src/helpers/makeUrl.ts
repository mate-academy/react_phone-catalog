export const makeUrl = (word: string) => {
  let result = word[0].toLowerCase();

  for (let index = 1; index < word.length; index += 1) {
    if (word[index] === ' ') {
      result += word[index + 1].toUpperCase() + word.slice(index + 2);

      return result;
    }

    result += word[index];
  }

  return result;
};
