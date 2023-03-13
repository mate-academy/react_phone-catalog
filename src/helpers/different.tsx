export const calculatePrice = (price: number, discount: number) => (
  Math.round(price - price * (discount / 100))
);

export const transformType = (type: string) => {
  switch (type) {
    case 'phone':
      return 'phones';

    case 'tablet':
      return 'tablets';

    case 'accessory':
      return 'accessories';

    default:
      return '';
  }
};
