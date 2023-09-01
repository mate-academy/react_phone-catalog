import { useEffect, useState } from 'react';
import './HomePage.scss';
import { getProducts } from '../../api/products';
import {
  BannerSlider,
  Categories,
  ProductsSlider,
  Wrapper,
} from '../../components';
import { Product } from '../../types/Product';

export const HomePage = () => {
  const [products, setProducts] = useState<Product []>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts);
  }, []);

  return (
    <div className="home">
      <Wrapper>
        <div className="home__banner-container">
          <BannerSlider />
        </div>

        <Categories />

        <div className="home__hot-prices-container">
          <ProductsSlider
            products={products}
            title="hot prices"
          />
        </div>

        <div className="home__brand-new-container">
          <ProductsSlider
            products={products}
            title="brand new models"
          />
        </div>
      </Wrapper>
    </div>
  );
};
