import './Breadcrumbs.scss';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  categoryName: string;
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ categoryName, productName }) => {
  const categoryNormalized =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="breadcrumb">
      <Link className="breadcrumb__icon-home" to="/" />
      <div className="breadcrumb__icon-arrow"></div>

      {productName ? (
        <Link
          className="breadcrumb__item breadcrumb__item--link"
          to={`/${categoryName}`}
        >
          {categoryNormalized}
        </Link>
      ) : (
        <span className="breadcrumb__item breadcrumb__item--current">
          {categoryNormalized}
        </span>
      )}

      {productName && (
        <>
          <div className="breadcrumb__icon-arrow"></div>
          <span className="breadcrumb__item breadcrumb__item--current">
            {productName}
          </span>
        </>
      )}
    </div>
  );
};
