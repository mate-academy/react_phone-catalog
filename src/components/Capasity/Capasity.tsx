import React from 'react';
import './Capasity.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  product: ProductDetails;
  pathname: string;
};

export const Capacity: React.FC<Props> = ({ product, pathname }) => {
  return (
    <>
      {product.capacityAvailable.map((capacity) => {
        const isSelected = product.capacity === capacity;
        const path = pathname.replace(
          product.capacity.toLowerCase(),
          capacity.toLowerCase(),
        );

        return (
          <Link
            to={{ pathname: `${path}` }}
            className={classNames('capacity', {
              'capacity--active': isSelected,
            })}
            key={capacity}
          >
            {`${Number.parseInt(capacity, 10)} GB`}
          </Link>
        );
      })}
    </>
  );
};
