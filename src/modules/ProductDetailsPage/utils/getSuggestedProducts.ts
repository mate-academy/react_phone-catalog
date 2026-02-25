import { DetailsProductType } from '../../../shared/types/DetailsProductType';
import { ProductType } from '../../../shared/types/ProductType';

export const getSuggestedProducts = (
  products: ProductType[],
  chooseProduct: DetailsProductType,
) => {
  const category = chooseProduct.category;
  const price = chooseProduct.priceDiscount;

  const sameCategoryProduct = products.filter(
    item => item.category === category && item.itemId !== chooseProduct.id,
  );

  const scored = sameCategoryProduct.map(item => ({
    item: item,
    diff: Math.abs(item.price - price),
  }));

  scored.sort((a, b) => a.diff - b.diff);

  return scored.map(item => item.item);
};
