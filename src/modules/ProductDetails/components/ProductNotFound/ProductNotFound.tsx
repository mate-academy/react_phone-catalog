import React from 'react';

import descrStyles from '../Description/Description.module.scss';
import PNFStyles from './ProductNotFound.module.scss';

export const ProductNotFound: React.FC = () => {
  return (
    <div>
      <h2 className={descrStyles.title}>Product was not found</h2>
      <img
        className={PNFStyles.img}
        src="/img/product-not-found.png"
        alt="Product not found"
      />
    </div>
  );
};
