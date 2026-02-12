export const getTitle = (category: string) => {
  switch (category) {
    case 'phones':
      return 'Mobile phones';
    case 'tablets':
      return 'Tablets';
    case 'accessories':
      return 'Accessories';
    default:
      return 'Products';
  }
};
