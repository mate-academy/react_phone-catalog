import React from 'react';
import { useLocation } from 'react-router-dom';

import { Phone } from '../types/Phone';

type Props = {
  phones: Phone [],
};

export const Location: React.FC<Props> = ({ phones }) => {
  const location = useLocation();
  const pathname = location.pathname.slice(1).split('/');

  const category = pathname[0];
  const productId = pathname[1];
  const product = phones.find(phone => phone.id === productId);

  return (
    <div className="location">
      <div className="location__home" />
      <div className="location__vector" />
      <div className="location__path">{category}</div>
      {product && (
        <>
          <div className="location__vector" />
          <div className="location__path">{product.name}</div>
        </>
      )}
    </div>
  );
};
