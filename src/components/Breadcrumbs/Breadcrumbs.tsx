import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Breadcrumbs.scss';
import home from '../../images/icons/Home.svg';

type Props = {
  page: string[],
};

export const Breadcrumbs: React.FC<Props> = ({ page }) => {
  return (
    <div
      className="Breadcrumbs"
      data-cy="breadCrumbs"
    >
      <Link to="/" className="Breadcrumbs__home">
        <img
          src={home}
          alt="Home"
          className="Breadcrumbs__home-img"
        />
      </Link>

      <div className="Breadcrumbs__arrow" />
      <Link
        to={`/${page[0]}`}
        className={classNames('Breadcrumbs__page-title', {
          'Breadcrumbs__page-title--dark': page.length > 1,
        })}
      >
        {page[0]}
      </Link>

      {page.length > 1 && (
        <>
          <div className="Breadcrumbs__arrow" />
          <p className="Breadcrumbs__product-title">
            {page[1]}
          </p>
        </>
      )}
    </div>
  );
};
