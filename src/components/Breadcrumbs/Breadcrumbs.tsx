import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import homeIcon from '../../images/icons/Home.svg';
import './Breadcrumbs.scss';

type Props = {
  page: string,
  productName?: string | undefined,
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

      {productName && (
        <>
          <div className="Breadcrumbs__arrow" />
          <Link
            to={`/${page}`}
            className={classNames('Breadcrumbs__page-title', {
              'Breadcrumbs__page-title--dark': productName,
            })}
          >
            {page}
          </Link>

          <div className="Breadcrumbs__arrow" />

          <p className="Breadcrumbs__product-title">
            {productName}
          </p>
        </>
      )}
    </div>
  );
};
