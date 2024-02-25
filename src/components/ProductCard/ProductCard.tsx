import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { BASE_URL } from '../../helpers/constants';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { image, name } = product;

  return (
    <Link
      to="/home"
      className="product-card"
      data-cy="categoryLinksContainer"
    >
      <div className="product-card__content">
        <img src={`${BASE_URL}${image}`} alt={name} className="product-card__image" />
        <h3>{product.id}</h3>
      </div>
    </Link>
  );
};
