export const getTitle = (type: string) => {
  switch (type) {
    case 'phone':
      return 'Mobile phones';

    case 'tablet':
      return 'Tablets';

    case 'accessory':
      return 'Accessories';

    default:
      return '';
  }
};
