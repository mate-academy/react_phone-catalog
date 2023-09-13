import { useMemo } from 'react';
import './HomePage.scss';
import {
  BannerSlider,
  Categories,
  ProductsSlider,
  Wrapper,
} from '../../components';
import { useProducts } from '../../context';

export const HomePage = () => {
  const { products } = useProducts();

  const getHotPriceProducts = () => {
    return products
      .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));
  };

  const productsForHotPrices = useMemo(() => {
    return getHotPriceProducts();
  }, []);

  const getBrandNewProducts = () => {
    return productsForHotPrices
      .sort((a, b) => b.year - a.year);
  };

  const productsNewest = useMemo(() => {
    return getBrandNewProducts();
  }, []);

  return (
    <div className="home">
      <Wrapper>
        <div className="home__banner-container">
          <BannerSlider />
        </div>

        <div className="home__hot-prices-container">
          <ProductsSlider
            products={productsForHotPrices}
            title="hot prices"
          />
        </div>

        <Categories />

        <div className="home__brand-new-container">
          <ProductsSlider
            products={productsNewest}
            title="brand new models"
          />
        </div>
      </Wrapper>
    </div>
  );
};
