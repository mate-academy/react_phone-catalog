/* eslint-disable */
import { useEffect, useState } from 'react';
import { Carousel } from '../../components/CarouselHome/CarouselHome';
import styles from './HomePage.module.scss';
import { HomeCategory } from '../../components/HomeCategory/HomeCategory';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/Product';

export const HomePage = () => {
  const { products } = useAppSelector(state => state.product);
  const [newPhones, setNewPhones] = useState<Product[]>([]);
  const [hotPrice, setHotPrice] = useState<Product[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const filteredNewPhones = products
      .filter(product => product.year === 2022)
      .reduce<Product[]>((acc, product) => {
        if (!acc.some(p => p.color === product.color)) {
          acc.push(product);
        }

        return acc;
      }, []);

    const filteredHotPrice = products
      .map(product => ({
        ...product,
        discount: product.price - (product.fullPrice ?? product.price),
      }))
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 10);

    setNewPhones(filteredNewPhones);
    setHotPrice(filteredHotPrice);
  }, [products]);

  return (
    <div className={styles.container}>
      <h1>Welcome to Nice Gadgets store!</h1>
      <div className={styles.content}>
        <Carousel products={newPhones} name="Brand new models" />
        <HomeCategory />
        <Carousel products={hotPrice} name="Hot prices" />
      </div>
    </div>
  );
};
