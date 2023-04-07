import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from '../types/Phone';
import { capitalize } from '../utils/detailsUtils';

type Props = {
  phones: Phone [],
};

export const Breadcrumbs: React.FC<Props> = ({ phones }) => {
  const location = useLocation();
  const pathname = location.pathname.slice(1).split('/');

  const category = pathname[0];
  const productId = pathname[1];
  const product = phones.find(phone => phone.id === productId);

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <Link
        to="/"
        className="breadcrumbs__home"
      />
      <div className="breadcrumbs__vector" />
      <Link
        to={`/${capitalize(category)}`}
        className="breadcrumbs__path"
      >
        {category}
      </Link>
      {product && (
        <>
          <div className="breadcrumbs__vector" />
          <div className="breadcrumbs__path">{product.name}</div>
        </>
      )}
    </div>
  );
};
