import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';
import { getProductDiscount } from '../../utils/getProductDiscount';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Slider } from '../../components/Slider';

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

  const getBrandNewProducts = useMemo(() => {
    return products
      .filter(product => product.discount === 0)
      .sort((a, b) => a.price - b.price);
  }, [products]);

  return (
    <>
      <Slider />

      <section className="Page-Section">
        <ProductsSlider
          products={getHotPriceProducts}
          title="Hot prices"
        />
      </section>

      <ShopByCategory />

      <section className="Page-Section">
        <ProductsSlider
          products={getBrandNewProducts}
          title="Brand new models"
        />
      </section>
    </>
  );
};
