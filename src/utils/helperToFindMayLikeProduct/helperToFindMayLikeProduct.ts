import type { Gadget } from '../../types/gadgets';
import type { Product } from '../../types/products';

export const helperToFindMayLikeProducts = (
  products: Product[],
  gadgets: Gadget[],
): Product[] => {
  const gadgetIds = gadgets.map((gadget) => gadget.id);

  const productsMayLike = products.filter((product) =>
    gadgetIds.includes(product.itemId),
  );

  return productsMayLike;
};
