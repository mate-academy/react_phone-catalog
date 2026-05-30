import React, { useEffect } from 'react';
import { useStateContext } from '../../state/state';
import { Loader } from '../../components';
import './HomePage.scss';
import { NewModels, HotPrices, BannerSlider, ByCategory } from './components';
import { useLoadProducts } from '../../hooks/useLoadProducts';

export const HomePage: React.FC = () => {
  const { state } = useStateContext();
  const loadProducts = useLoadProducts();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (state.loading) {
    return <Loader />;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  return (
    <div className="home-page">
      <h1 className="home-page__title typography__h1">
        Welcome to Nice Gadgets store!
      </h1>
      <div className="home-page__blocks">
        <BannerSlider className="home-page__banner-slider" />
        <NewModels className="home-page__new-models" />
        <ByCategory />
        <HotPrices className="home-page__hot-prices" />
      </div>
    </div>
  );
};
