/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './ProductCardSkeleton.scss';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {};

export const ProductCardSkeleton: React.FC<Props> = () => {
  return (
    <div className="card-skeleton">
      <Skeleton className="card-skeleton__img" height={208} />
      <Skeleton className="card-skeleton__title" />
      <Skeleton className="card-skeleton__price" height={20} />
      <Skeleton className="card-skeleton__spec" count={3} />
    </div>
  );
};
