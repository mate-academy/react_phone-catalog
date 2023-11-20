import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';
import { getProductDiscount } from '../../utils/getProductDiscount';
import { ProductsSlider } from '../../components/ProductsSlider';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const getHotPriceProducts = useMemo(() => {
    return products
      .filter(product => product.discount !== 0)
      .sort((a, b) => getProductDiscount(a) - getProductDiscount(b));
  }, [products]);

  return (
    <>
      <h1>Home page</h1>

      <section className="Page-Section">
        <ProductsSlider
          products={getHotPriceProducts}
          title="Hot prices"
        />
      </section>
    </>
  );
};
