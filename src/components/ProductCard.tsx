/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from '../types/Phone';
import { ProductsContext } from '../context/ProductsContext';
import {
  addOneCart,
  path,
  cart,
} from '../utils/cartApi';

type Props = {
  phone: Phone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const { cartList, setCartList } = useContext(ProductsContext);
  const imagePath = `${path}_new/${phone.image}`;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setCartList(addOneCart(cartList, cart(phone)));
  };

  const isSelected = useMemo(() => {
    return cartList.some(item => item.id === phone.id);
  }, [cartList]);

  return (
    <Link
      to={`/Phones/${phone.id}`}
      className="product-card"
      data-cy="cardsContainer"
    >
      <div className="product-card__picture">
        <img
          className="product-image"
          src={imagePath}
          alt={phone.phoneId}
        />
      </div>
      <div className="product-info-wrapper">
        <div className="product-card__title">
          <span>{phone.name}</span>
        </div>
        <div className="product-price ">
          <div className="product-price__regular">
            $
            {phone.price}
          </div>
          {phone.year !== 2019 && (
            <div className="product-price__full">
              $
              {phone.fullPrice}
            </div>
          )}
        </div>
        <div className="product-card__details">
          <div className="info-block">
            <div className="info-block__title">Screen</div>
            <div className="info-block__value">{phone.screen}</div>
          </div>
          <div className="info-block">
            <div className="info-block__title">Capacity</div>
            <div className="info-block__value">{phone.capacity}</div>
          </div>
          <div className="info-block">
            <div className="info-block__title">RAM</div>
            <div className="info-block__value">{phone.ram}</div>
          </div>
        </div>
        <div className="card-button">
          <button
            className={classNames(
              'card-button__add',
              { 'card-button__add--selected': isSelected },
            )}
            type="button"
            onClick={(event) => handleClick(event)}
          >
            { isSelected ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            className="card-button__favourite"
            type="button"
            onClick={(event) => event.preventDefault()}
          />
        </div>
      </div>
    </Link>
  );
};
