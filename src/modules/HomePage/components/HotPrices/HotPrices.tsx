/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { ProductSlider } from '../../../shared/Shared_Components/ProductSlider/ProductSlider';
import { CategoriesTypes, UpdatedProduct } from '../../../shared/Types/types';
import { getProductsByCategory } from '../../../../api/getProducts';
import { ProductSliderSkeleton } from '../../../shared/Shared_Components/ProductCardSkeleton/ProductSliderSkeleton';

export const HotPrices = () => {
  const title = 'Hot prices';
  const [productList, setProductList] = useState<UpdatedProduct[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filteredList = productList
    ?.filter(item => {
      return item.name.includes('7');
    })
    .sort((prev, next) => {
      return next.price - prev.price;
    });

  useEffect(() => {
    getProductsByCategory(CategoriesTypes.Phones)
      .then(setProductList)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return !isLoading ? (
    <ProductSlider
      productList={filteredList}
      componentTitle={title}
      discount={true}
    />
  ) : (
    <ProductSliderSkeleton componentTitle={title} />
  );
};
