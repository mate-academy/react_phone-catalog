import React from 'react';
import { useStateContext } from '../../state/state';

import style from './HomePage.module.scss';

import { Loader } from '../../components/Loader/Loader';
import { Banner } from '../../components/Banner/Banner';
import { ProductCart } from '../../components/ProductCart/ProductCart';
import { Category } from '../../components/Category/Category';
import { HotPrice } from '../../components/HotPrice/HotPrice';

export const HomePage: React.FC = () => {
  const { state } = useStateContext();

  if (state.loading) {
    return <Loader />;
  }

  return (
    <div className={style.home_page}>
      <h1 className={style.home_page__title}>Product Catalog</h1>

      <div className={style.home_page__content}>
        <div className={style.home_page__content_banner}>
          <Banner />
        </div>

        <div className={style.home_page__content_cards}>
          <ProductCart />
        </div>

        <div className={style.home_page__content_category}>
          <Category />
        </div>

        <HotPrice />
      </div>
    </div>
  );
};
