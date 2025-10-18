/* eslint-disable max-len */
import Slider from './components/Slider';
import styles from './HomePage.module.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import Category from './components/Category/Category';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { useEffect, useState } from 'react';
import { PhoneDetails } from '../ProductDetails/interfaces/PhoneDetailsInterface';

export const HomePage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<PhoneDetails[]>([]);
  const productsHomeSlider = allProducts.slice(0, 12);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`./api/phones.json`);

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const products: PhoneDetails[] = await response.json();

        setAllProducts(products);
      } catch (error) {}
    };

    fetchProduct();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.header__title}>
          Welcome to Nice{' '}
          <span className={styles.header__lineBreak}>Gadgets store!</span>
        </h1>

        <Slider />
      </div>

      <ProductSlider
        title="Brand new models"
        showOldPrice={false}
        limit={10}
        products={productsHomeSlider || []}
      />

      <Category />

      <ProductSlider
        title="Hot prices"
        showOldPrice={true}
        limit={10}
        products={productsHomeSlider || []}
      />
    </>
  );
};
