/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCategory } from '../../ui/modules';

import { getProductsByCategory } from '../../utils';
import { Product, ProductCategories } from '../../types';
import './CategoryPage.scss';
import { Loader } from '../../ui/base';

type Props = {};

export const CategoryPage: React.FC<Props> = () => {
  const { pathname } = useLocation();
  const category = pathname.slice(1) as ProductCategories;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getProductsByCategory(category)
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="category">
      {isLoading && <Loader />}
      {!isLoading && (
        <ProductCategory products={products} category={category} />
      )}
    </div>
  );
};
