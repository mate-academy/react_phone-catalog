import { ProdCard, ProductDetails } from '../../types/Product';

export const adaptedProductCard = (
  productDetails: ProductDetails,
): ProdCard => {
  return {
    id: productDetails.id,
    name: productDetails.name,
    price: productDetails.priceDiscount || productDetails.priceRegular,
    fullPrice: productDetails.priceRegular,
    img: productDetails.images[0],
    specs: [
      { name: 'Screen', value: productDetails.screen },
      { name: 'Capacity', value: productDetails.capacity },
      { name: 'RAM', value: productDetails.ram },
    ],
  };
};
