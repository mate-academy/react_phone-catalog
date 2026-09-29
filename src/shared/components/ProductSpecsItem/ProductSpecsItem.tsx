import React from 'react';

import cn from 'classnames';
import './ProductSpecsItem.scss';

type Props = {
  label: string;
  value?: string;
  className?: string;
};

export const ProductSpecsItem: React.FC<Props> = ({
  label,
  value,
  className = '',
}) => {
  if (!value) {
    return null;
  }

  return (
    <div className={cn('product-specs__row', className)}>
      <dt className="product-specs__name">{label}</dt>
      <dd className="product-specs__value">{value}</dd>
    </div>
  );
};
