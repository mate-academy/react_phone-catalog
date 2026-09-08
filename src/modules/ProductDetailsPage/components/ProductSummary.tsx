import React from 'react';

import { ProductActions } from '../../../components/ProductActions';
import { ProductPrice } from '../../../components/ProductPrice';
import { cx } from './styles';

export interface ProductSpec {
  label: string;
  value: string;
}

interface Props {
  price: number;
  fullPrice?: number;
  isInCart: boolean;
  isFavorited: boolean;
  specs: ProductSpec[];
  onCartClick: () => void;
  onFavoriteClick: () => void;
}

export const ProductSummary: React.FC<Props> = ({
  price,
  fullPrice,
  isInCart,
  isFavorited,
  specs,
  onCartClick,
  onFavoriteClick,
}) => (
  <>
    <ProductPrice
      price={price}
      fullPrice={fullPrice}
      className={cx('price')}
      currentClassName={cx('current-price')}
      oldClassName={cx('old-price')}
    />

    <div className={cx('actions')}>
      <ProductActions
        isInCart={isInCart}
        isFavorited={isFavorited}
        onCartClick={onCartClick}
        onFavoriteClick={onFavoriteClick}
      />
    </div>

    <dl className={cx('short-specs')}>
      {specs.map(spec => (
        <div className={cx('spec-row')} key={spec.label}>
          <dt>{spec.label}</dt>
          <dd>{spec.value}</dd>
        </div>
      ))}
    </dl>
  </>
);
