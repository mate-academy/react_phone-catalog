import Carousel from './Carousel';
import styles from './HomePage.module.scss';
import { useState } from 'react';
import { Product } from '@/types';
import SliderComponent from './SliderComponent';
import productsList from '../../../../public/api/products.json';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsList);
  return (
    <>
      <h1 className={styles.PageTitle}>Welcome to Nice Gadgets store!</h1>
      <Carousel />
      <SliderComponent products={products} title="Brand new models" />
    </>
  );
};

export default HomePage;
