import { useMemo } from 'react';
import { ProductDetails } from '../types/productDetails';
import { useLocation, useParams } from 'react-router-dom';
import productsList from '../../public/api/products.json';

import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';

interface UseProductDetailsResult {
  product: ProductDetails | undefined;
  products: ProductDetails[];
}

export const useProductDetails = (): UseProductDetailsResult => {
  const { pathname } = useLocation();
  const { productId } = useParams();

  const category = pathname.split('/')[1];

  const products = useMemo(() => {
    switch (category) {
      case 'phones':
        return phones;

      case 'tablets':
        return tablets;

      case 'accessories':
        return accessories;

      default:
        return [];
    }
  }, [category]);

  const product = products.find(item => item.id === productId);

  const productFromList = productsList.find(item => item.itemId === productId);

  const updatedProduct = useMemo(() => {
    if (!product) {
      return undefined;
    }

    return {
      ...product,
      priceRegular: productFromList?.fullPrice ?? product.priceRegular,
      priceDiscount: productFromList?.price ?? product.priceDiscount,
    };
  }, [product, productFromList]);

  return {
    product: updatedProduct,
    products,
  };
};
