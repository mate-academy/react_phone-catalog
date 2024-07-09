import { Pathname } from '../enums/Pathname';
import { Product } from '../types/ContextType/Product';

export const filterGadgets = (loc: string, prod: Product[]) => {
  switch (loc) {
    case Pathname.phones:
      const phones = [...prod].filter(phone => phone.category === 'phones');

      return {
        gadgetsLen: phones.length,
        gadgets: phones,
      };
    case Pathname.tablets:
      const tablets = [...prod].filter(phone => phone.category === 'tablets');

      return {
        gadgetsLen: tablets.length,
        gadgets: tablets,
      };
    case Pathname.accessories:
      const accessories = [...prod].filter(
        phone => phone.category === 'accessories',
      );

      return {
        gadgetsLen: accessories.length,
        gadgets: accessories,
      };
    default:
      return {
        gadgetsLen: 0,
        gadgets: [],
      };
  }
};
