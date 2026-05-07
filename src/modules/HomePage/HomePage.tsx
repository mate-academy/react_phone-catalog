import { useEffect, useMemo, useState } from 'react';
import { Banner } from './components/Banner';
import { Categories } from './components/Categories';
import type { Product } from '../../types/Product';
import { getProducts } from '../../api';
import { CardsSlider } from '../shared/CardsSlider';
import s from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts<Product>('products').then(setProducts);
  }, []);

  const newModel = useMemo(() => {
    return [...products].sort((p1, p2) => p2.year - p1.year);
  }, [products]);

  const hotPrices = useMemo(() => {
    return [...products].sort((p1, p2) => {
      const discount1 = p1.fullPrice - p1.price;
      const discount2 = p2.fullPrice - p2.price;

      return discount2 - discount1;
    });
  }, [products]);

  return (
    <>
      <h1 className={s.homePage__title}>Welcome to Nice Gadgets store!</h1>

      <Banner />

      <div className={s.homePage__content}>
        <CardsSlider products={newModel} name="Brand new models" />
        <Categories />
        <CardsSlider products={hotPrices} name="Hot prices" />
      </div>
    </>
  );
};
