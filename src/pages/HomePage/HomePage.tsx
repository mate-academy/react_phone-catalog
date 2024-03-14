import { useCallback, useEffect, useMemo } from 'react';
import { getBrandNewProducts, getHotPriceProducts } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProductSlider } from '../../components/ProductSlider';
import { thunkGetPhones } from '../../features/product/productsSlice';
import { Categories } from '../../components/Categories';
import { BannerSwiper } from '../../components/BannerSwiper';

export const HomePage = () => {
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

      {!loading && !error && phones && (
        <section className="hot-prices">
          <ProductSlider title="Hot prices" products={hotPrices} />
        </section>
      )}

      <section className="shop-by-category">
        <Categories />
      </section>

      {!loading && !error && phones && (
        <section className="brand-new-models">
          <ProductSlider title="Brand new models" products={brandNew} />
        </section>
      )}
    </div>
  );
};
