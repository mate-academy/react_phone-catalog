import React from 'react';
import { Link } from 'react-router-dom';

import './Phone.scss';

import { Product } from '../../helpers/Product';

type Props = {
  product: Product;
  onLikeClick: (product: Product) => void;
  likeProduct: Product[];
  addProduct: Product[];
  onAddtoChart: (product: Product) => void;
};

export const Phone: React.FC<Props> = ({
  product,
  onLikeClick,
  likeProduct,
  addProduct,
  onAddtoChart,
}) => {
  const {
    phoneId,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    category,
  } = product;
  const selectPr = likeProduct.find(phone => phone.phoneId === phoneId);
  const addPr = addProduct.find(phone => phone.phoneId === phoneId);

  const handleLikeClick = (select: Product) => {
    onLikeClick(select);
  };

  const handleAddClick = (select: Product) => {
    onAddtoChart(select);
  };

  return (
    <li
      className="phone"
    >
      <Link to={`/${category}/${phoneId}`}>
        <img
          src={` https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
          alt={name}
          className="phone__img"
        />

        <div className="phone__name">
          {name}
        </div>
      </Link>

      <div className="phone__cost">
        <div className="phone__cost--discount">
          {`$${price}`}
        </div>

        <div className="phone__cost--real">
          {`$${fullPrice}`}
        </div>
      </div>

      <div className="phone__criteria">
        <div className="phone__criteria--container">
          <div
            className="
              phone__criteria--big
            "
          >
            Screen
          </div>
          <div
            className="
              phone__criteria--small
            "
          >
            {screen}
          </div>
        </div>

        <div className="phone__criteria--container">
          <div
            className="
            phone__criteria--big
            "
          >
            Capacity
          </div>
          <div
            className="
            phone__criteria--small
            "
          >
            {capacity}
          </div>
        </div>

        <div className="phone__criteria--container">
          <div
            className="
            phone__criteria--big
            "
          >
            Ram
          </div>
          <div
            className="
            phone__criteria--small
            "
          >
            {ram}
          </div>
        </div>
      </div>

      <div className="phone__button">
        <button
          className={`phone__button--add ${addPr ? 'phone__button--add--active' : ''}`}
          onClick={() => handleAddClick(product)}
          type="button"
        >
          Add to cart
        </button>

        {/* eslint-disable-next-line */}
        <button
          className={`phone__button--like ${selectPr ? 'phone__button--like--active' : ''}`}
          onClick={() => handleLikeClick(product)}
          type="button"
        />
      </div>
    </li>
  );
};
