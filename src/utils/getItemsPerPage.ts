export const getItemsPerPage = (value: string, maxItems: number) => {
  switch (value) {
    case 'all':
      return maxItems;

    case '4':
      return 4;

    case '16':
      return 16;

    case '8':
    case '':
    default:
      return 8;
  }
};
