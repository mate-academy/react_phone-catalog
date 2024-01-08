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
      <section className="Page-Slider">
        <Slider />
      </section>

      <section className="Page-HotPrice">
        <ProductsSlider
          products={getHotPriceProducts}
          title="Hot prices"
        />
      </section>

      <section className="Page-ShopByCategory">
        <ShopByCategory />
      </section>

      <section className="Page-BrandNew">
        <ProductsSlider
          products={getBrandNewProducts}
          title="Brand new models"
        />
      </section>
    </>
  );
};
