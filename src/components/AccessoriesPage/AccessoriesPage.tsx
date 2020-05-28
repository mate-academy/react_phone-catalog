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
    <div className="tablet-container">
      <h1 className="tablet__title">Sorry, no products</h1>
      <span className="tablet__sum">
        {/* {accessories.length}
        {' '}
        models */}
      </span>
      <div className="tablet-wrap">
        {accessories.map(product => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
