import { useEffect, useState } from 'react';

import { useStoredProducts } from '@shared/contexts/StoredProducts';
import { getProductById } from '@shared/services/api/api';
import { StoredProductModel } from '@shared/types/Product/Product.model';

export const useCart = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState<StoredProductModel[] | null>(
    null,
  );

  const { storedProducts } = useStoredProducts();

  useEffect(() => {
    const storedCartProducts = storedProducts.cartProducts;

    Promise.all(
      storedCartProducts.map(({ productId }) => getProductById(productId)),
    )
      .then(response => {
        const preparedProducts = response
          .filter(product => !!product)
          .map(product => {
            const quantity =
              storedCartProducts.find(stored => stored.productId === product.id)
                ?.quantity || 1;

            return { ...product, quantity };
          });

        setCartProducts(preparedProducts);
      })
      .finally(() => {
        setIsInitialLoading(false);
      });
  }, [storedProducts]);

  return {
    cartProducts,
    isInitialLoading,
  };
};
