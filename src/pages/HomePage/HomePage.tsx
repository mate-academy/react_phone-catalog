import React, { useCallback, useEffect, useMemo } from 'react';
import './HomePage.scss';
import { getBrandNewProducts, getHotPriceProducts } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProductSlider } from '../../components/ProductSlider';
import { thunkGetPhones } from '../../features/product/productsSlice';
import { Categories } from '../../components/Categories';
import { BannerSwiper } from '../../components/BannerSwiper';
import { Loader } from '../../components/Loader';

export const HomePage: React.FC = () => {
  const { phones, loading, error } = useAppSelector(state => state.phones);
  const dispatch = useAppDispatch();

  const loadPhones = useCallback(() => {
    dispatch(thunkGetPhones());
  }, [dispatch]);

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  const hotPrices = useMemo(() => {
    return getHotPriceProducts(phones);
  }, [phones]);

  const brandNew = useMemo(() => {
    return getBrandNewProducts(phones);
  }, [phones]);

  return (
    <div className="home-page">
      <BannerSwiper />

      {loading && !error && (
        <div className="home-page__loader">
          <Loader />
        </div>
      )}

      {!loading && !error && phones && (
        <section className="hot-prices">
          <ProductSlider title="Hot prices" products={hotPrices} />
        </section>
      )}

      <section className="shop-by-category">
        <Categories />
      </section>

      {loading && !error && (
        <div className="home-page__loader">
          <Loader />
        </div>
      )}

      {!loading && !error && phones && (
        <section className="brand-new-models">
          <ProductSlider title="Brand new models" products={brandNew} />
        </section>
      )}
    </div>
  );
};
