import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';
import './HomePage.scss';

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    // eslint-disable-next-line max-len
    fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
      .then(response => response.json())
      .then(products => {
        setHotProducts(products
          .filter((product: Product) => product.discount)
          .sort((a: Product, b: Product) => {
            return b.price * b.discount - a.price * a.discount;
          }));

        setBrandNewProducts(products
          .filter((product: Product) => !product.discount)
          .sort((a: Product, b: Product) => {
            return b.price - a.price;
          }));
      });
  }, []);

  return (
    <div className="HomePage">
      <h1>Home Page</h1>

      <ProductsSlider
        sliderTitle="Hot prices"
        products={hotProducts}
      />

      <ProductsSlider
        sliderTitle="Brand new models"
        products={brandNewProducts}
      />
    </div>
  );
};
