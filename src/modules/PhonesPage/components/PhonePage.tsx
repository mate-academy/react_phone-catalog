/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { AnimatedLayout } from '../../shared/Shared_Components/AnimatedComponents/AnimatedLayout';
import { ProductPage } from '../../shared/Shared_Components/ProductPage/ProductPage';
import { CategoriesTypes, UpdatedProduct } from '../../shared/Types/types';
import { getProductsByCategory } from '../../../api/getProducts';

export const PhonePage: React.FC = () => {
  const title = 'Mobile Phones';
  const [productList, setProductList] = useState<UpdatedProduct[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProductsByCategory(CategoriesTypes.Phones)
      .then(setProductList)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AnimatedLayout>
      <ProductPage
        pageTitle={title}
        listOfProducts={productList}
        isLoading={isLoading}
      />
    </AnimatedLayout>
  );
};
