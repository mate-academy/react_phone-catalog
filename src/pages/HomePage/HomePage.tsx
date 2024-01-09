/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider';
import { Product } from '../../types/Product';
import { getProducts } from '../../services/getProducts';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Promo } from '../../components/Promo';
import './home-page.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProductsFromServer = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch {
      console.warn('products loading error!');
    }
  };

  useEffect(() => {
    getProductsFromServer();
  }, []);

  return (
    <>
      <Slider />

      <div className="home-list__wrapper">
        <Promo
          title="Hot prices"
          products={products}
        />
      </div>

      <ShopByCategory />

      <div className="home-list__wrapper">
        <Promo
          title="Brand new models"
          products={products}
        />
      </div>
    </>
  );
};
