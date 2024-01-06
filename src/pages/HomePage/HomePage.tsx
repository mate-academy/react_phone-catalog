/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { Promo } from '../../components/Promo';
import { Slider } from '../../components/Slider';
import './home-page.scss';
import { Product } from '../../types/Product';
import { getProducts } from '../../services/getProducts';
import { ShopByCategory } from '../../components/ShopByCategory';

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
      <Promo
        title="Hot price"
        products={products}
      />
      <ShopByCategory />
      <Promo
        title="Brand new models"
        products={products}
      />
    </>
  );
};
