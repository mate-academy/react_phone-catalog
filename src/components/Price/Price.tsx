import React from 'react';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';

type Props = {
  currentItem: Phone | Tablet | Accessory | undefined;
  section: string;
};

export const Price: React.FC<Props> = ({ currentItem, section }) => {
  return (
    currentItem && (
      <p className="product-item__price">
        {`$${currentItem.priceDiscount} `}
        {section !== 'brand-new' && (
          <span className="product-item__price-regular">
            {` $${currentItem.priceRegular}`}
          </span>
        )}
      </p>
    )
  );
};
