import { CatalogProduct } from '../types/CatalogProduct';
import { CommonPropsProduct } from '../types/CommonPropsProduct';

export function toCommonPropsProducts(
  catalogProducts: CatalogProduct[],
): CommonPropsProduct[] {
  const commonPropsProducts: CommonPropsProduct[] = catalogProducts.map(
    product => {
      const {
        id,
        name,
        priceRegular,
        priceDiscount,
        screen,
        capacity,
        ram,
        images,
      } = product;

      return {
        itemId: id,
        name,
        fullPrice: priceRegular,
        price: priceDiscount,
        screen,
        capacity,
        ram,
        image: images[0],
      };
    },
  );

  return commonPropsProducts;
}
