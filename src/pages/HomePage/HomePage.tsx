import React, { useEffect, useState } from 'react';
import style from './HomePage.module.scss';
import { Banner } from '../../components/Banner/Banner';
import { ProductList } from '../../components/ProductList/ProductList';
import { Product } from '../../utils/Product';
import { CategoriesList } from '../../components/CategoryList/CategoryList';

export const HomePage: React.FC = () => {
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);

  useEffect(() => {
    const getNewModels = async () => {
      try {
        const res = await fetch('api/phones.json');
        const json: Product[] = await res.json();

        const latestModels = json.slice(0, 20);

        setNewModels(latestModels);
      } catch (e) {}
    };

    const getHotPrices = async () => {
      try {
        const res = await fetch('api/phones.json');
        const json: Product[] = await res.json();

        const sortedByDiscount = json
          .filter(
            p => p.priceDiscount !== undefined && p.priceRegular !== undefined,
          )
          .sort(
            (a, b) =>
              b.priceRegular! -
              b.priceDiscount! -
              (a.priceRegular! - a.priceDiscount!),
          )
          .slice(0, 15);

        setHotPrices(sortedByDiscount);
      } catch (e) {}
    };

    getNewModels();
    getHotPrices();
  }, []);

  return (
    <>
      <h1 className={style.title}>Welcome to Nice Gadgets store!</h1>

      <Banner />

      <ProductList title="Brand new models" products={newModels} />

      <h2 className={style.title_h2}>Shop by category</h2>

      <CategoriesList />

      <ProductList title="Hot prices" products={hotPrices} />
    </>
  );
};
