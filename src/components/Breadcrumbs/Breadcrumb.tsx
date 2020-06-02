import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProducts } from '../../redux';

export const Breadcrumb = ({ label, link, isLast }: BreadcrumbProps) => {
  const products: Product[] = useSelector(getProducts);

  const preparedLabel = products.find(product => (
    product.id === label
  ))?.name || label;

  return (
    <li className="breadcrumbs__item">
      <span className="breadcrumbs__arrow" />
      {isLast
        ? <span className="breadcrumbs__last">{preparedLabel}</span>
        : (
          <NavLink
            to={link}
            className="breadcrumbs__link"
            activeClassName="breadcrumbs__link--active"
          >
            {preparedLabel}
          </NavLink>
        )}
    </li>
  );
};
