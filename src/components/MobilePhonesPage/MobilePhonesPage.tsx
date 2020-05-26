import React, { useState, useEffect } from 'react';
import { getProducts } from '../../helpers/api';
import { Card } from '../Card/Card';
import './MobilePhonesPage.scss';

export const MobilePhonesPage: React.FC = () => {
  const [phonesOnly, setPhonesOnly] = useState<Slide[]>([]);

  useEffect(() => {
    getProducts().then(data => setPhonesOnly(data.filter((product: Slide) => product.type === 'phone')));
  }, []);

  return (
    <div className="phones-container">
      <h1 className="phones__title">Mobile phones</h1>
      <span className="phones__sum">
        {phonesOnly.length}
        {' '}
        models
      </span>
      <div className="phones-wrap">
        {phonesOnly.map(product => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
