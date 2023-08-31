import { useEffect, useState } from 'react';
import './HomePage.scss';
import { getProducts } from '../../api/products';
import {
  BannerSlider,
  ProductsSlider,
  // ProductCard,
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

        <ProductsSlider
          products={products}
          title="hot prices"
        />
      </Wrapper>
    </div>
  );
};
