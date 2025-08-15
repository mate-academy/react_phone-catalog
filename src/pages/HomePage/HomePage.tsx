import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { Banner } from '../../components/Banner';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../../utils/Product';
import { CategoriesList } from '../../components/CategoriesList';

export const HomePage: React.FC = () => {
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);

  useEffect(() => {
    const getNewModels = async () => {
      try {
        const res = await fetch('/api/phones.json');
        const json: Product[] = await res.json();

        // const latestYear = Math.max(...json.map(p => p.year));

        const latestModels = json.slice(0, 20);

        setNewModels(latestModels);
      } catch (e) {}
    };

    const getHotPrices = async () => {
      try {
        const res = await fetch('/api/phones.json');
        const json: Product[] = await res.json();

        const maxDiscount = Math.max(
          ...json.map(p => {
            if (p.priceDiscount === undefined || p.priceRegular === undefined) {
              return -Infinity;
            }

            return p.priceRegular - p.priceDiscount;
          }),
        );

        const range = 100;

        const hotProducts = json.filter(
          p => p.priceRegular - p.priceDiscount >= maxDiscount - range,
        );

        // const minPrice = Math.min(...json.map(p => p.price));
        // const maxPrice = minPrice + 300;

        // const hotProducts = json.filter(
        //   p => p.price >= minPrice && p.price <= maxPrice,
        // );

        setHotPrices(hotProducts);
      } catch (e) {}
    };

    getNewModels();
    getHotPrices();
  }, []);

  return (
    <>
      <h1 className="title__h1">Welcome to Nice Gadgets store!</h1>

      <Banner />

      <ProductsList title="Brand new models" products={newModels} />

      <h2 className="title__h2">Shop by category</h2>

      <CategoriesList />

      <ProductsList title="Hot prices" products={hotPrices} />
    </>
  );
};
