import React from 'react';
import './ProductCard.scss';
import { Product } from '../types/Product';
import { NavLink } from 'react-router-dom';
import { ButtonAdd } from '../ButtonAdd';
import { ButtonFavs } from '../ButtonFavs';
import { ItemTech } from '../ItemTech';

type Props = {
  product: Product;
  fullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, fullPrice }) => {
  const itemsTech = [
    {
      title: 'Screen',
      value: product.screen,
    },
    {
      title: 'Capacity',
      value: product.capacity,
    },
    {
      title: 'RAM',
      value: product.ram,
    },
  ];

  return (
    <div className="product-card">
      <div className="product-card__content">
        <NavLink className="product-card__link" to={`${product.itemId}`}>
          <img
            src={product.image}
            alt="Product logo"
            className="product-card__image"
          />
        </NavLink>
        <NavLink to={`${product.itemId}`} className="product-card__title">
          {product.name}
        </NavLink>
        <div className="product-card__price">
          <p className="product-card__price--discount">{`$${product.price}`}</p>
          {fullPrice && (
            <p className="product-card__price--full">{`$${product.fullPrice}`}</p>
          )}
        </div>
      </div>

      <ItemTech itemsTech={itemsTech} />

      <div className="product-card__buttons">
        <ButtonAdd addedProduct={product} />
        <ButtonFavs favourite={product} />
      </div>
    </div>
  );
};
