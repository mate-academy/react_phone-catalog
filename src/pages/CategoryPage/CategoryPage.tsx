import React, { useEffect, useState } from 'react';
import { ProductCategory } from '../../ui/modules';

import { getProductsByCategory } from '../../utils';
import { Product, ProductCategories } from '../../types';
import './CategoryPage.scss';
import { Loader } from '../../ui/base';

type Props = {
  category: ProductCategories;
};

export const CategoryPage: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getProductsByCategory(category)
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [category]);

  return (
    <div className="category">
      {isLoading && <Loader />}
      {!isLoading && (
        <ProductCategory products={products} category={category} />
      )}
    </div>
  );
};
