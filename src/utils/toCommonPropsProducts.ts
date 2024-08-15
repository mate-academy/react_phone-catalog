import { CatalogProduct } from '../types/CatalogProduct';
import { CommonPropsProduct } from '../types/CommonPropsProduct';

export function toCommonPropsProduct(
  catalogProduct: CatalogProduct,
): CommonPropsProduct {
  const {
    id,
    category,
    name,
    priceRegular,
    priceDiscount,
    screen,
    capacity,
    ram,
    images,
  } = catalogProduct;

  return {
    itemId: id,
    category,
    name,
    fullPrice: priceRegular,
    price: priceDiscount,
    screen,
    capacity,
    ram,
    image: images[0],
  };
}

export function toCommonPropsProducts(
  catalogProducts: CatalogProduct[],
): CommonPropsProduct[] {
  return catalogProducts.map(product => toCommonPropsProduct(product));
}
