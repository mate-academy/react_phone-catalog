import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../images/icons/Home.svg';
import './Breadcrumbs.scss';

type Props = {
  page: string,
  productName?: string,
};

export const Breadcrumbs: React.FC<Props> = ({ page, productName }) => {
  return (
    <div
      className="Breadcrumbs"
      data-cy="breadCrumbs"
    >
      <Link to="/" className="Breadcrumbs__home">
        <img
          src={homeIcon}
          alt="Home"
          className="Breadcrumbs__home-img"
        />
      </Link>

      <div className="Breadcrumbs__arrow" />
      <Link
        to={`/${page}`}
        className={classNames('Breadcrumbs__page-title', {
          'Breadcrumbs__page-title--dark': productName,
        })}
      >
        {page}
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
