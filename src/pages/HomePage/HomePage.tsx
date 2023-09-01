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
        <BannerSlider />

        <Categories />

        <ProductsSlider
          products={products}
          title="hot prices"
        />

        <ProductsSlider
          products={products}
          title="brand new models"

        />
      </Wrapper>
    </div>
  );
};
