import { Product } from '../types/Product';

export const getProductLinkByColor = (
  color: string,
  productId: string | undefined,
  products: Product[] | undefined,
) => {
  if (productId && products) {
    const splitedProducId = productId?.split('-');

    splitedProducId[splitedProducId.length - 1] = color.toLocaleLowerCase();

    const correctProductId = splitedProducId.join('-');

    const correctProduct = products.find(product =>
      product.itemId.includes(correctProductId),
    );

    const correctProductLink = `/${correctProduct?.category}/${correctProduct?.phoneId}`;

    return correctProductLink;
  }

  return '';
};
