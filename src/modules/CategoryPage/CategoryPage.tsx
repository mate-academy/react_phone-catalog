import React, { useCallback, useEffect, useState } from 'react';
import { Catalog } from '../../components/Catalog';
import { CatalogProducts, CategoriesType } from '../../types/Types';
import { getAccessories, getPhones, getTablets } from '../../api/products';

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
    setErrorMessage('');
    try {
      let data: CatalogProducts[] = [];

      switch (category) {
        case CategoriesType.PHONES:
          data = await getPhones();
          break;
        case CategoriesType.TABLETS:
          data = await getTablets();
          break;
        case CategoriesType.ACCESSORIES:
          data = await getAccessories();
          break;
        default:
          data = [];
      }

      setProducts(data);
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Catalog
      title={title}
      products={products}
      errorMessage={errorMessage}
      isLoading={isLoading}
      onReload={fetchProducts}
      category={category}
    />
  );
};
