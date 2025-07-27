import { useParams } from 'react-router-dom';
import type { Product } from '../types/products';
import { useEffect, useState } from 'react';
import { getProduct } from '../api/fetchProducts';

export const useProductForCategories = () => {
  const { category, itemId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts([]);
    setLoading(true);

    getProduct()
      .then((products) => {
        const filtered = products.filter(
          (product) => product.category === category,
        );
        setProducts(filtered);
      })
      .finally(() => setLoading(false));
  }, [category]);

  const amountProduct = products.length;
  const selectedCategory = category ? category : '';

  return {
    itemId,
    category,
    products,
    loading,
    amountProduct,
    selectedCategory,
  };
};
