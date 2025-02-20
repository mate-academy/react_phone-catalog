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

      {/* <div className="product-card__description">
        <p className="product-card__description-item">
          Screen
          <span className="product-card__description-item--value">
            {product.screen}
          </span>
        </p>
        <p className="product-card__description-item">
          Capacity
          <span className="product-card__description-item--value">
            {product.capacity}
          </span>
        </p>
        <p className="product-card__description-item">
          RAM
          <span className="product-card__description-item--value">
            {product.ram}
          </span>
        </p>
      </div> */}

      <ItemTech itemsTech={itemsTech} />

      <div className="product-card__buttons">
        {/* <button className="product-card__button-cart">Add to cart</button>
        <button className="product-card__button-favs"></button> */}
        <ButtonAdd />
        <ButtonFavs />
      </div>
    </div>
  );
};
