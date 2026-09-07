import { useCallback, useContext } from 'react';
import { GlobalContext } from '../../../../../context/GlobalContext';
import { Product } from '../../../../../types/Product';
import { ProductDetails } from '../../../../../types/ProductDetails';

export const useProductOperations = () => {
  const { allProducts, addToCart, toggleFavorites } = useContext(GlobalContext);

  const findProductById = useCallback(
    (selectedProductId: string): Product | undefined => {
      return allProducts.find(product => product.itemId === selectedProductId);
    },
    [allProducts],
  );

  const handleAddToCart = useCallback(
    (productDetails: ProductDetails) => {
      const product = findProductById(productDetails.id);

      if (product) {
        addToCart(product);
      }
    },
    [addToCart, findProductById],
  );

  const handleToggleFavorites = useCallback(
    (productDetails: ProductDetails) => {
      const product = findProductById(productDetails.id);

      if (product) {
        toggleFavorites(product);
      }
    },
    [toggleFavorites, findProductById],
  );

  return { handleAddToCart, handleToggleFavorites };
};
