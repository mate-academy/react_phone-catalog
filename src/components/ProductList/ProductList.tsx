import './ProductList.scss';
import React from 'react';
import classNames from 'classnames';
import { ProductShort } from '../../types/ProductShort';
import { ProductCard } from '../ProductCard/ProductCard';
import {
  HorizontProductCard,
} from '../HorizontProductCard/HorizontProductCard';

type Props = {
  totalPrice?: number,
  onSetTotalPrice?: (num: number) => void,
  products: ProductShort[],
  numLiked: number,
  onSetNumLiked: (num: number) => void,
  numAdded: number,
  onSetNumAdded: (num: number) => void,
};

export const ProductList: React.FC<Props> = ({
  totalPrice,
  onSetTotalPrice = () => {},
  products,
  numLiked,
  onSetNumLiked,
  numAdded,
  onSetNumAdded,
}) => {
  return (
    <ul className="product-list" data-cy="productList">
      {products.map(product => (
        <li
          key={product.id}
          className={classNames({ 'product-list__item': totalPrice })}
        >
          {totalPrice ? (
            <HorizontProductCard
              product={product}
              totalPrice={totalPrice}
              onSetTotalPrice={onSetTotalPrice}
              numAdded={numAdded}
              onSetNumAdded={onSetNumAdded}
            />
          ) : (
            <ProductCard
              product={product}
              numLiked={numLiked}
              onSetNumLiked={onSetNumLiked}
              numAdded={numAdded}
              onSetNumAdded={onSetNumAdded}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
