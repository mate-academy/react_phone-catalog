import React, { useState, useContext } from 'react';
import './HorizontProductCard.scss';
import { Link, useLocation } from 'react-router-dom';

import classNames from 'classnames';
import { ProductShort } from '../../types/ProductShort';
import { LikeAndCartContext } from '../../helpers/LikeAndCartContext';
import { KeysOfStorage } from '../../types/KeysOfStorage';
import {
  handlerChangeContext,
  handlerStorageOneIdIs,
} from '../../helpers/handlerChangeContext';
import { BASE_URL } from '../../helpers/consts';
import { NamesByLinks } from '../../types/NamesByLinks';
import { getState } from '../../helpers/getState';

type Props = {
  product: ProductShort,
  totalPrice: number,
  onSetTotalPrice: (num: number) => void,
  numAdded: number,
  onSetNumAdded: (num: number) => void,
};

export const HorizontProductCard: React.FC<Props> = ({
  product, totalPrice, onSetTotalPrice, numAdded, onSetNumAdded,
}) => {
  const {
    image,
    name,
    price,
    phoneId,
  } = product;
  const {
    addedToCart,
    setAddedToCart,
  } = useContext(LikeAndCartContext);

  const getQuantity = () => {
    return addedToCart.filter(id => id === phoneId).length;
  };

  const [quantity, setQuantity] = useState(getQuantity);
  const { pathname, search } = useLocation();

  const handlerClickDeleteToCart = () => {
    handlerChangeContext(
      phoneId, addedToCart, setAddedToCart, KeysOfStorage.Cart,
    );
    onSetNumAdded(numAdded - quantity);
    onSetTotalPrice(totalPrice - (price * quantity));
  };

  const handlerClickPlus = () => {
    setQuantity(current => current + 1);
    setAddedToCart([...addedToCart, phoneId]);
    handlerStorageOneIdIs(true, phoneId);
    onSetTotalPrice(totalPrice + price);
    onSetNumAdded(numAdded + 1);
  };

  const handlerClickMinus = () => {
    setQuantity(current => current - 1);

    const indexDelete = addedToCart.indexOf(phoneId);
    const newAdded = [...addedToCart];

    newAdded.splice(indexDelete, 1);
    setAddedToCart(newAdded);

    handlerStorageOneIdIs(false, phoneId);
    onSetTotalPrice(totalPrice - price);
    onSetNumAdded(numAdded - 1);
  };

  return (
    <div className="horizont-card">
      <div className="horizont-card__left">
        <button
          type="button"
          className="horizont-card__close"
          onClick={handlerClickDeleteToCart}
          data-cy="cartDeleteButton"
        >
          ×
        </button>

        <Link
          to={`${NamesByLinks.Phones}/${phoneId}`}
          state={getState(pathname, search)}
          className="horizont-card__image--container"
        >
          <img
            src={`${BASE_URL}/${image}`}
            alt={`${BASE_URL}/${image}`}
            className="horizont-card__image"
          />
        </Link>

        <div className="horizont-card__name">{name}</div>
      </div>

      <div className="horizont-card__right">
        <div className="horizont-card__pagination">
          <button
            type="button"
            className={classNames(
              'horizont-card__pagination--button',
              { 'is-disabled': quantity === 1 },
            )}
            disabled={quantity === 1}
            onClick={handlerClickMinus}
          >
            –
          </button>

          <span className="horizont-card__pagination--number">
            {quantity}
          </span>

          <button
            type="button"
            className="horizont-card__pagination--button"
            disabled={false}
            onClick={handlerClickPlus}
          >
            +
          </button>
        </div>

        <h2 className="title__h-two">{`$${price}`}</h2>
      </div>
    </div>
  );
};
