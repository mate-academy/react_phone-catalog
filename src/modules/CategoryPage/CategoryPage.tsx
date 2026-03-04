import React, { useCallback, useEffect, useState } from 'react';

import { Catalog } from '../../components/Catalog';
import { CatalogProducts, CategoriesType } from '../../types/Types';
import { getProducts } from '../../api/products';

interface CategoryPageProps {
  title: string;
  category: CategoriesType;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  title,
  category,
}) => {
  const [products, setProducts] = useState<CatalogProducts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const allProducts = await getProducts();

      setProducts(allProducts);
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter(
    product => product.category === category,
  );

  return (
    <Catalog
      title={title}
      products={filteredProducts}
      errorMessage={errorMessage}
      isLoading={isLoading}
      onReload={fetchProducts}
    />
  );
};
