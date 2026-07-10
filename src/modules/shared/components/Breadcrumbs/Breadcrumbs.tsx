import React from 'react';
import './Breadcrumbs.scss';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { Category } from '../../../../types/Category';

type Props = {
  className: string;
  category: Category;
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({
  className,
  category,
  productName,
}) => {
  const linkToCategory = category.toLowerCase();
  const correactCategory =
    category.slice(0, 1).toUpperCase() + category.slice(1);

  return (
    <div className={`breadcrumb ${className}`}>
      <Link to={'/'} className="breadcrumb__icon-home-wrapper">
        <Icon className="breadcrumb__icon-home" name="home" />
      </Link>
      <Icon className="breadcrumb__icon-arrow-right" name="arrow-right" />
      <Link className="breadcrumb__text" to={`/${linkToCategory}`}>
        {correactCategory}
      </Link>
      {productName && (
        <>
          <Icon className="breadcrumb__icon-arrow-right" name="arrow-right" />
          <p className="breadcrumb__text">{productName}</p>
        </>
      )}
    </div>
  );
};
