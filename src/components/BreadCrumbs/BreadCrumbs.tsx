import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  category: string;
  subCategory?: string;
};

export const BreadCrumbs: React.FC<Props> = ({
  category,
  subCategory = '',
}) => {
  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__home">
        <img
          className="breadcrumbs__image"
          src="img/icons/home.png"
          alt="homepage"
        />
      </Link>

      <div className="breadcrumbs__divider"></div>
      <div className="breadcrumbs__crumb">
        <Link to={`/${category.toLowerCase()}`} className="breadcrumbs__link">
          {category}
        </Link>
      </div>
      {subCategory && (
        <>
          <div className="breadcrumbs__divider"></div>
          <div className="breadcrumbs__crumb">
            <div className="breadcrumbs__link breadcrumbs__link-nolink">
              {subCategory}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
