/* eslint-disable no-confusing-arrow */
/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import '../styles/BreadCrumbs.scss';

interface Props {
  category: string;
  productName?: string;
}

export const BreadCrumbs: React.FC<Props> = ({ category, productName }) => {
  return (
    <div className="bread-crumbs" data-cy="breadCrumbs">
      <Link to="/" className="bread-crumbs__home">
        <div className="bread-crumbs__home-icon" />
      </Link>

      <div className="bread-crumbs__arrow-right" />

      <Link
        to={`/${category.toLowerCase()}`}
        className={cn('PathLink__path', {
          'bread-crumbs__path--no-active': productName,
        })}
      >
        {category}
      </Link>

      {productName && (
        <>
          <div className="bread-crumbs__arrow-right" />
          <p className="bread-crumbs__path">{productName}</p>
        </>
      )}
    </div>
  );
};
