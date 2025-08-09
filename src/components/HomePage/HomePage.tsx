import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { Banner } from '../Banner';
import { CategorySelectCard } from '../CategorySelectCard';
import { ProductsList } from '../ProductsList';
import { Product } from '../../utils/Product';

export const HomePage: React.FC = () => {
  const [newModels, setNewModels] = useState<Product[]>([]);

  useEffect(() => {
    const getNewModels = async () => {
      try {
        const res = await fetch('/api/products.json');
        const json: Product[] = await res.json();

        const latestYear = Math.max(...json.map(p => p.year));

        const latestModels = json.filter(p => p.year === latestYear);

        setNewModels(latestModels);
      } catch (e) {}
    };

    getNewModels();
  }, []);

  return (
    <>
      <h1 className="title">Welcome to Nice Gadgets store!</h1>

      <Banner />

      <ProductsList title="Brand new models" products={newModels} />

      <h2 className="title-2">Shop by category</h2>

      <CategorySelectCard />

      <h2 className="title-2">Hot prices</h2>
    </>
  );
};
