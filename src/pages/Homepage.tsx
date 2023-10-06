import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';
import { MainSlider } from '../components/MainSlider/MainSlider';
import { ProductsSlider } from '../components/ProductSlider/ProductSlider';
import { ShopCategory } from '../components/ShopCategory/ShopCategory';

export const Homepage: React.FC = () => {
  const { products } = useAppSelector(state => state.products);
  const getHotPriceProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));
  }, [products]);

  const getBrandNewProducts = useMemo(() => {
    return [...products].sort((a, b) => b.price - a.price);
  }, [products]);

  return (
    <main className="homepage">
      <div className="homepage__content">
        <MainSlider />
        <ProductsSlider
          products={getHotPriceProducts}
          title="Hot prices"
        />
        <ShopCategory />
        <ProductsSlider
          products={getBrandNewProducts}
          title="Brand new models"
        />
      </div>
    </main>
  );
};
