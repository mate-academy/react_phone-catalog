import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Loader } from '../../components/Loader';
import { Slider } from '../../components/Slider';
import { HotPrices } from '../../components/HotPrices';
import { ShopByCategory } from '../../components/ShopByCategory';
import { BrandNew } from '../../components/BrandNew';

export const HomePage: React.FC = () => {
  const { isLoading } = useContext(AppContext);

  return (
    <>
      {isLoading && (<Loader />)}
      <Slider />
      <HotPrices />
      <ShopByCategory />
      <BrandNew />
    </>
  );
};
