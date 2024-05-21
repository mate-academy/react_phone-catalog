// import { toggleFavorite } from '../../features/favorites/favoritesSlice';
// import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
// eslint-disable-next-line max-len
// import { useGetAccessoriesQuery } from '../../store/api/extendedApi/accessorize';

import React from 'react';
import { Slider } from '../../modules/Slider';
import { Categories } from '../../modules/Categories';
import { ProductsSlider } from '../../modules/ProductsSlider';
import { useGetDataQuery } from '../../store/api/api';

export const Home = () => {
  const { data } = useGetDataQuery();
  const copiedData = data ? [...data] : [];

  const getHighestPrice = copiedData
    .sort((a, b) => b.year - a.year)
    .slice(0, 12)
    .sort((a, b) => b.price - a.price);

  const getHighestDiscounts = copiedData
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 12);

  return (
    <React.Fragment>
      <Slider />
      <Categories />

      <ProductsSlider
        products={getHighestPrice}
        isDiscount={false}
        title="Brand new models"
      />

      <ProductsSlider
        products={getHighestDiscounts}
        isDiscount={true}
        title="Hot prices"
      />
    </React.Fragment>
  );
};
