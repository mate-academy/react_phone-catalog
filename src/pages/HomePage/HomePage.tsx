import React from 'react';
import { Banner } from '../../components/Banner/Banner';
import { Category } from '../../components/Category/Category';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { ProductCard } from '../../components/ProductCard/ProductCard';

import style from './HomePage.module.scss';
import { useStateContext } from '../../state/state';
import { Loader } from '../../components/Loader/Loader';

export const HomePage: React.FC = () => {
  const { state } = useStateContext();

  if (state.loading) {
    return <Loader />;
  }

  return (
    <div className={style.home_page}>
      <h1 className={style.home_page__title}>Welcome to Nice Gadgets store!</h1>

      <div className={style.home_page__block}>
        <div className={style.home_page__block_banner}>
          <Banner />
        </div>

        <div className={style.home_page__block_card}>
          <ProductCard />
        </div>

        <div className={style.home_page__block_category}>
          <Category />
        </div>

        <HotPrices />
      </div>
    </div>
  );
};
