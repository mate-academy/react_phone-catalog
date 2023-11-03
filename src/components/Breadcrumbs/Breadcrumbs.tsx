import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../images/icons/Home.svg';
import { Category } from '../../types/Category';
import './Breadcrumbs.scss';

type Props = {
  category: Category | undefined,
  productName?: string,
};

export const Breadcrumbs: React.FC<Props> = ({ category, productName }) => {
  return (
    <div className="Breadcrumbs">
      <Link to="/" className="Breadcrumbs__home">
        <img
          src={homeIcon}
          alt="Home"
          className="Breadcrumbs__home-img"
        />
      </Link>

      <div className="Breadcrumbs__arrow" />
      <Link
        to={`/${category}`}
        className={classNames('Breadcrumbs__page-title', {
          'Breadcrumbs__page-title--dark': productName,
        })}
      >
        {category}
      </Link>

      {productName && (
        <>
          <div className="Breadcrumbs__arrow" />
          <p className="Breadcrumbs__product-title">
            {productName}
          </p>
        </>
      )}
    </div>
  );
};
