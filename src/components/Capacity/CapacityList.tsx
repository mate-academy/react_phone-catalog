import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { DetailsProduct } from '../../types/DetailsProduct';
import './capacity-list.scss';

type Props = {
  product: DetailsProduct;
  pathname: string;
};

export const CapacityList: FC<Props> = ({ product, pathname }) => {
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
