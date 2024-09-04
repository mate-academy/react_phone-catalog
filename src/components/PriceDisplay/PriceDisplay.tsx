import React from 'react';
import './PriceDisplay.scss';

type Props = {
  priceRegular: number;
  priceDiscount?: number;
  showDiscount?: boolean;
};

export const PriceDisplay: React.FC<Props> = ({
  priceRegular,
  priceDiscount,
  showDiscount,
}) => {
  return (
    <div className="price-display">
      <span className="price-display__discount">${priceDiscount}</span>
      {showDiscount && (
        <span className="price-display__regular price-display__sale">
          ${priceRegular}
        </span>
      )}
    </div>
  );
};
