import React, { useState } from 'react';

import { AllItemsList } from '../../components/AllItemsList';
import { Product } from '../../utils/Product';
import '../ProductsPage.scss';

export const AccessoriesPage: React.FC = () => {
  const [allItems, setAllItems] = useState<Product[]>([]);

  return (
    <>
      <div className="title">
        <h1 className="title__name">Accessories</h1>
        <p className="title__quantity">{allItems.length} models</p>
      </div>

      <AllItemsList
        path="/api/accessories.json"
        allItems={allItems}
        setAllItems={setAllItems}
      />
    </>
  );
};
