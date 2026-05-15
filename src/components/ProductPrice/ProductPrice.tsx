import React from 'react';

interface Props {
  price: number;
  fullPrice?: number;
  hideDiscount?: boolean;
  className?: string;
  currentClassName?: string;
  oldClassName?: string;
}

const formatPrice = (value: number) => `$${value.toLocaleString()}`;

export const ProductPrice: React.FC<Props> = ({
  price,
  fullPrice,
  hideDiscount = false,
  className,
  currentClassName,
  oldClassName,
}) => {
  const showFullPrice = !hideDiscount && fullPrice !== undefined && fullPrice > price;

  return (
    <div className={className}>
      <div className={currentClassName}>{formatPrice(price)}</div>

      {showFullPrice && <div className={oldClassName}>{formatPrice(fullPrice)}</div>}
    </div>
  );
};
