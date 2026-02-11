import { Spec } from '../../shared/components/ProductSpecs';
import { ProdCard, ProductDetails } from '../../types/Product';

export const adaptedProductConfig = (
  productDetails: ProductDetails,
  productSpec: Spec[],
): ProdCard => {
  return {
    id: productDetails.id,
    name: productDetails.name,
    price: productDetails.priceDiscount || productDetails.priceRegular,
    fullPrice: productDetails.priceRegular,
    img: productDetails.images[0],
    specs: productSpec,
  };
};
