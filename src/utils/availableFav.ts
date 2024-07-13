import { Product } from '../types/ContextType/Product';

export const availableFav = (gadgets: Product, favorGadget: Product[]) => {
  return !!favorGadget.find(item => item.itemId === gadgets.itemId);
};
