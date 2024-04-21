export function getLinkName(str: string) {
  const words = str
    .split('-')
    .map(word => {
      if (word === 'gb') {
        return word.toUpperCase();
      }

      if (word === 'iphone') {
        return 'iPhone';
      }

      return word[0].toUpperCase() + word.slice(1);
    });

  return words.join(' ');
}
