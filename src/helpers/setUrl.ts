export const setUrl = (item: string) => {
  switch (true) {
    case item.includes('logo'): {
      return '/';
    }

    case item.includes('burger'): {
      return 'burger';
    }

    case item.includes('instagram'): {
      return 'https://instagram.com';
    }

    case item.includes('tikTok'): {
      return 'https://tiktok.com';
    }

    case item.includes('pinterest'): {
      return 'https://pinterest.com';
    }

    default: {
      return '';
    }
  }
};
