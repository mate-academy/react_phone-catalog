/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { AnimatedLayout } from '../../shared/Shared_Components/AnimatedComponents/AnimatedLayout';
import { ProductPage } from '../../shared/Shared_Components/ProductPage/ProductPage';
import { CategoriesTypes, UpdatedProduct } from '../../shared/Types/types';
import { getProductsByCategory } from '../../../api/getProducts';
//import { useLocation } from 'react-router-dom';

export const TabletPage: React.FC = () => {
  const title = 'Tablets';
  const [productList, setProductList] = useState<UpdatedProduct[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProductsByCategory(CategoriesTypes.Tablets)
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
