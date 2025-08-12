import React, { useEffect, useState } from 'react';

import { Product } from '../../utils/Product';
import { ProductCard } from '../ProductCard';
import './AllItemsList.scss';

type Props = {
  path: string;
};

export const AllItemsList: React.FC<Props> = ({ path }) => {
  const [allItems, setAllItems] = useState<Product[]>([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(path);
        const json: Product[] = await res.json();

        setAllItems(json);
      } catch (e) {}
    };

    getItems();
  }, []);

  return (
    <div className="catalog">
      {allItems.map(item => (
        <ProductCard product={item} key={item.id} />
      ))}
    </div>
  );
};
