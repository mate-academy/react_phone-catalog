import React, { useState } from 'react';

import { AllItemsList } from '../../components/AllItemsList';
import { Product } from '../../utils/Product';
import './MobilePhonesPage.scss';

export const MobilePhonesPage: React.FC = () => {
  const [allItems, setAllItems] = useState<Product[]>([]);

  return (
    <>
      <div className="title">
        <h1 className="title__name">Mobile phones</h1>
        <p className="title__quantity">{allItems.length} models</p>
      </div>

      <AllItemsList
        path="/api/phones.json"
        allItems={allItems}
        setAllItems={setAllItems}
      />
    </>
  );
};
