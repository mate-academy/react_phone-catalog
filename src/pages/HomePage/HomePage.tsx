import React, { useCallback, useEffect, useMemo } from 'react';
import './HomePage.scss';
import { Carousel } from '../../components/Carousel';
import { ProductSlider } from '../../components/ProductSlider';
import { Categories } from '../../components/Categories';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { thunkGetPhones } from '../../features/product/productSlice';
import { getBrandNewProducts, getHotPriceProducts } from '../../api/api';
import { Loader } from '../../components/Loader';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { phones, loading, error } = useAppSelector(state => state.phones);

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
      <Carousel />

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
