export const giveCurrency = (lang: string) => {
  switch (lang) {
    case 'et': {
      return '€';
    }

    case 'ru':
    case 'uk': {
      return '₴';
    }

    default: {
      return '£';
    }
  }
};
