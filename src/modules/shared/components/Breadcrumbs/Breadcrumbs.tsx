import React from 'react';
import './Breadcrumbs.scss';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { Category } from '../../../../types/Category';
import { useLanguage } from '../../../../context/LanguageContext';

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
  const { texts } = useLanguage();
  const linkToCategory = category.toLowerCase();
  const correctedCategoryText = texts[category];

  return (
    <div className={`breadcrumb ${className}`}>
      <Link to={'/'} className="breadcrumb__icon-home-wrapper">
        <Icon className="breadcrumb__icon-home" name="home" />
      </Link>
      <Icon className="breadcrumb__icon-arrow-right" name="arrow-right" />
      <Link className="breadcrumb__text" to={`/${linkToCategory}`}>
        {correctedCategoryText}
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
