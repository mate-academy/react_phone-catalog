import React, { useState, useEffect } from 'react';
import { getProducts } from '../../helpers/api';
import { Card } from '../Card/Card';
import './AccessoriesPage.scss';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Slide[]>([]);

  useEffect(() => {
    getProducts().then(data => setAccessories(data.filter((product: Slide) => product.type === 'accessory')));
  }, []);

  return (
    <div className="AccessoriesContainer">
      <h1 className="Accessories__Title">Sorry, no products</h1>
      <div className="AccessoriesContainer__Inner">
        {accessories.map(product => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
