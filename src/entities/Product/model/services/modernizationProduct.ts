import { Product, ProductFromServer, ProductInfo } from '../types/product';

export const modernizationProducts = (
  products: ProductFromServer[],
  productsInfo: ProductInfo[],
) => {
  try {
    const newProducts: Product[] = [...products].map(
      (product: ProductFromServer) => {
        const card = productsInfo.find(item => item.itemId === product.itemId);

        return {
          ...product,
          favorite: card ? card.favorite : false,
          cartItem: card ? card.cartItem : false,
        };
      },
    );

    return newProducts;
  } catch (e) {
    throw new Error('Error processing products');
  }
};
