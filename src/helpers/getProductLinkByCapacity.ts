import { Product } from '../types/Product';

export const getProductLinkByCapacity = (
  capacity: string,
  productId: string | undefined,
  products: Product[] | undefined,
) => {
  if (productId && products) {
    const splitedProducId = productId?.split('-');

    splitedProducId[splitedProducId.length - 2] = capacity.toLocaleLowerCase();

    const correctProductId = splitedProducId.join('-');

    const correctProduct = products.find(product =>
      product.itemId.includes(correctProductId),
    );

    const correctProductLink = `/${correctProduct?.category}/${correctProduct?.phoneId}`;

    return correctProductLink;
  }

  return '';
};
