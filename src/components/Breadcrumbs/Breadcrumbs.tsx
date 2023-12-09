import React, { memo } from 'react';
import './Breadcrumbs.scss';
import { Link, useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

export const capitalize = (string: string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
};

type Props = {
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = memo(({ productName }) => {
  const { pathname } = useLocation();
  const directory = pathname.split('/')[1];

  return (
    <div
      data-cy="breadCrumbs"
      className="breadcrumbs"
    >
      <Link
        to="/"
        className="breadcrumbs__link"
      >
        <div className="breadcrumbs__icon breadcrumbs__icon--home">
          <ReactSVG
            src="img/icons/Home.svg"
          />
        </div>
      </Link>

      <div className="breadcrumbs__icon">
        <ReactSVG
          src="img/icons/Chevron (Arrow Right).svg"
        />
      </div>

      {productName ? (
        <>
          <Link
            to={`/${directory}`}
            className="breadcrumbs__link"
          >
            {capitalize(directory)}
          </Link>

          <div className="breadcrumbs__icon">
            <ReactSVG
              src="img/icons/Chevron (Arrow Right).svg"
            />
          </div>

          <p
            className="breadcrumbs__current"
          >
            {productName}
          </p>
        </>
      ) : (
        <p
          className="breadcrumbs__current"
        >
          {capitalize(directory)}
        </p>
      )}
    </div>
  );
});
