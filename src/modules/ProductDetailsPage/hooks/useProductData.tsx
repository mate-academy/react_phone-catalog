import { useCallback, useEffect, useState } from 'react';
import { ProductDetails } from '../../../types/ProductDetails';
import { getSpecificProducts } from '../../../utils/api';
import { ProductState } from '../types/types';

const LOADING_DELAY = 500;

export const useProductData = (category: string, productId: string) => {
  const [state, setState] = useState<ProductState>({
    currentProduct: null,
    categoryProducts: [],
    isLoading: true,
    error: '',
  });

  const findProductById = useCallback(
    (products: ProductDetails[], id: string): ProductDetails | null =>
      products.find(product => product.id === id) || null,
    [],
  );

  const updateProductState = useCallback(
    (products: ProductDetails[], id: string) => {
      const foundProduct = findProductById(products, id);

      setState(prevState => ({
        ...prevState,
        currentProduct: foundProduct,
        categoryProducts: products,
        error: foundProduct ? '' : 'Product not found',
        isLoading: false,
      }));
    },
    [findProductById],
  );

  useEffect(() => {
    if (!category || !productId) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        error: 'Invalid product or category',
      }));

      return;
    }

    setState(prevState => ({
      ...prevState,
      isLoading: true,
      error: '',
    }));

    const timeoutId = setTimeout(async () => {
      try {
        const fetchedProducts = await getSpecificProducts(category);

        updateProductState(fetchedProducts, productId);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';

        setState(prevState => ({
          ...prevState,
          currentProduct: null,
          categoryProducts: [],
          error: `Error loading products: The product category "${category}" does not exist. ${errorMessage}`,
          isLoading: false,
        }));
      }
    }, LOADING_DELAY);

    return () => clearTimeout(timeoutId);
  }, [category, productId, updateProductState]);

  return state;
};
