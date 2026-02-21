/* eslint-disable max-len */
import { useContext, useEffect, useState } from 'react';
import { ProductSlider } from '../../../shared/Shared_Components/ProductSlider/ProductSlider';
import { CategoriesTypes, UpdatedProduct } from '../../../shared/Types/types';
import { getProductsByCategory } from '../../../../api/getProducts';
import { ProductSliderSkeleton } from '../../../shared/Shared_Components/ProductCardSkeleton/ProductSliderSkeleton';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';

export const NewItems = () => {
  const title = 'Brand new models';
  const [productList, setProductList] = useState<UpdatedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useContext(DarkModeContext);

  const filteredList = productList
    ?.filter(item => {
      return item.name.includes('14');
    })
    .sort((prev, next) => {
      return next.fullPrice - prev.fullPrice;
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
      isDark={isDark}
    />
  ) : (
    <ProductSliderSkeleton componentTitle={title} />
  );
};
