import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

type Props = {
  category: string;
  categoryProduct?: string;
};

export const BreadCrumbs: React.FC<Props> = ({
  category,
  categoryProduct = '',
}) => {
  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__home">
        <img
          className="breadcrumbs__image"
          src="./img/icons/home.svg"
          alt="homepage"
        />
      </Link>

      <div className="breadcrumbs__divider" />
      <div className="breadcrumbs__crumb">
        <Link to={`/${category.toLowerCase()}`} className="breadcrumbs__link">
          {category}
        </Link>
      </div>
      {categoryProduct && (
        <>
          <div className="breadcrumbs__divider" />
          <div className="breadcrumbs__crumb">
            <div className="breadcrumbs__link breadcrumbs__link-product">
              {categoryProduct}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
