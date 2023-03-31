import { Gadget } from '../types/Gadjets';

export const getLinkForProductCard = (type: Gadget) => {
  switch (type) {
    case Gadget.Phone:
      return 'phones';

    case Gadget.Tablet:
      return 'tablets';

    case Gadget.Accessory:
      return 'accessories';

    default:
      throw new Error('no case');
  }
};
