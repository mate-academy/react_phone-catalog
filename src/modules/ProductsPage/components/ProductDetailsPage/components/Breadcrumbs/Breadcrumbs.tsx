/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  product: {
    name: string;
    category: 'phones' | 'tablets' | 'accessories';
  };
};

export const Breadcrumbs: React.FC<Props> = ({ product }) => {
  const categoryPath = `/${product.category}`;
  const categoryName =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link> / <Link to={categoryPath}>{categoryName}</Link> /{' '}
      <span>{product.name}</span>
    </nav>
  );
};
