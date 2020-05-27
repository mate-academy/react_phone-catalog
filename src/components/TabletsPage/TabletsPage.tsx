import React, { useState, useEffect } from 'react';
import { getProducts } from '../../helpers/api';
import { Card } from '../Card/Card';
import './TabletsPage.scss';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Slide[]>([]);

  useEffect(() => {
    getProducts().then(data => setTablets(data.filter((product: Slide) => product.type === 'tablet')));
  }, []);

  return (
    <div className="tablet-container">
      <h1 className="tablet__title">Tablets</h1>
      <span className="tablet__sum">
        {tablets.length}
        {' '}
        models
      </span>
      <div className="tablet-wrap">
        {tablets.map(product => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
