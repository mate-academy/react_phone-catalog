import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Slider } from '../../components/Slider/Slider';
import styles from './HomePage.module.scss';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { Product, Products } from '../../types/Product';
import { getBrandNewProducts, getHotPriceProducts } from '../../api/api';

export const HomePage: FC = () => {
  const [hotPricesProducts, setHotPricesProducts] = useState<Product[]>([]);
  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);
  const location = useLocation();

  const getProductsFromServer = async (value: Products) => {
    try {
      let fetchedProducts;

      switch (value) {
        case 'hotPrices':
          fetchedProducts = await getHotPriceProducts();
          setHotPricesProducts(fetchedProducts);
          break;

        case 'brandNew':
          fetchedProducts = await getBrandNewProducts();
          setBrandNewModels(fetchedProducts);
          break;

        default: break;
      }
    } catch (error) {
      (<h1>Error:, error</h1>);
    }
  };

  useEffect(() => {
    getProductsFromServer('hotPrices');
    getProductsFromServer('brandNew');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <section className={styles.home}>
      <Slider />
      <ProductSlider products={hotPricesProducts} title="Hot prices" />
      <ShopByCategory />
      <ProductSlider products={brandNewModels} title="Brand new models" />
    </section>
  );
};
