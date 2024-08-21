import React from 'react';
import productsFromServer from '../../api/products.json';
import './ProductCard.scss';
import { Link } from 'react-router-dom';

import phonesFromServer from '../../api/phones.json';
import tabletsFromServer from '../../api/tablets.json';
import accessoriesFromServer from '../../api/accessories.json';

type Props = {
  id: number;
};

export const ProductCard: React.FC<Props> = ({ id }) => {
  const findProduct = (idForProduct: number) =>
    productsFromServer.find(product => product.id === idForProduct) ||
    productsFromServer[0];

  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId,
    category,
  } = findProduct(id);

  let checkedName = name;
  let dots = false;

  if (name.length > 25) {
    checkedName = name.slice(0, 25);
    dots = true;
  }

  const findProductById = () => {
    switch (category) {
      case 'phones':
        return (
          phonesFromServer.find(phone => phone.id === itemId) ||
          phonesFromServer[0]
        );

      case 'tablets':
        return (
          tabletsFromServer.find(tablet => tablet.id === itemId) ||
          tabletsFromServer[0]
        );

      case 'accessories':
        return (
          accessoriesFromServer.find(access => access.id === itemId) ||
          accessoriesFromServer[0]
        );

      default:
        return phonesFromServer[0];
    }
  };

  return (
    <Link
      to={`products/${findProductById().namespaceId}?color=${findProductById().color}`}
      className="product-link"
    >
      <article className="product-card">
        <img src={image} alt="product photo" className="product-card__image" />
        <h4 className="product-card__title">
          {checkedName}
          {dots ? '...' : ''}
        </h4>
        <p className="product-card__price">${price}</p>
        <p className="product-card__full-price">${fullPrice}</p>
        <div className="product-card__line" />
        <div className="product-card__options-box">
          <div className="product-card__options">
            <h5 className="product-card__options-title">Screen</h5>
            <p className="product-card__options-value">{screen}</p>
          </div>
          <div className="product-card__options">
            <h5 className="product-card__options-title">Capacity</h5>
            <p className="product-card__options-value">{capacity}</p>
          </div>
          <div className="product-card__options">
            <h5 className="product-card__options-title">RAM</h5>
            <p className="product-card__options-value">{ram}</p>
          </div>
        </div>
        <div className="product-card__buttons-box">
          <button className="product-card__buy-button">Add to cart</button>
          <button className="product-card__favorite-button">
            <img src="./img/heart-icon.svg" alt="favorite" />
          </button>
        </div>
      </article>
    </Link>
  );
};
