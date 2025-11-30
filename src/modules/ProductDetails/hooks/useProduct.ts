import { useEffect, useState } from 'react';
import { PhoneDetails } from '../interfaces/PhoneDetailsInterface';

export const useProduct = (category?: string, productId?: string) => {
  const [product, setProduct] = useState<PhoneDetails | null>(null);
  const [allProducts, setAllProducts] = useState<PhoneDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    if (!category || !productId) {
      return;
    }

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setIsError('');

        const response = await fetch(`./api/${category}.json`);

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const products: PhoneDetails[] = await response.json();

        setAllProducts(products);

        const found = products.find(item => item.id === productId);

        if (!found) {
          throw new Error('Product not found');
        }

        setProduct(found);
      } catch (error) {
        setIsError('Product not found');
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [category, productId]);

  return { product, allProducts, isLoading, isError, setProduct };
};
