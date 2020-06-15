import React from 'react';
import './GadgetCard.scss';
import classNames from 'classnames';

type Props = {
  gadget: Gadget;
};

const GadgetCard: React.FC<Props> = ({gadget}) => {
  const {
    price, discount, id, imageUrl, name, screen, capacity, ram,
  } = gadget;

  const priceWithDiscount = price - (price * (discount / 100));

  return (
    <div className="gadget">
      <div className="gadget__photo">
        <img className="gadget__img" src={imageUrl} alt="gadget"/>
      </div>

      <div className="gadget__title">
        {name}
      </div>

      <span className="gadget__price">
        <p className="gadget__price-discount">{`$${priceWithDiscount}`}</p>
        <p className="gadget__price-value">
          {(price === priceWithDiscount)
            ? '' : (`$${price}`)}
        </p>
      </span>

      <div className="description gadget__description">
          <span className="characteristic__span">
            <span>
              Screen
            </span>

            <span>
              {screen}
            </span>
          </span>

          <span className="characteristic__span">
            <span>
              Capacity
            </span>

            <span>
              {capacity}
            </span>
          </span>

          <span className="characteristic__span">
            <span>
              RAM
            </span>

            <span>
              {ram}
            </span>
          </span>
      </div>

      <div className="gadget__button">
        <input
          type="button"
          value="Add to cart"
          className={classNames('gadget__button-add-to-cart', { 'gadget__button-add-to-cart-selected': true })}
        />

        <label
          htmlFor={id}
          className="gadget__button-favorite"
        >
          <input
            id={id}
            type="checkbox"
            className="gadget__button-favorite-input"
          />

          <span className="gadget__button-favorite-check"/>
        </label>
      </div>
    </div>
  );
};

export default GadgetCard;
