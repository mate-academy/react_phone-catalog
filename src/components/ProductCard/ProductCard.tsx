import { useState, useContext } from 'react';
import './ProductCard.scss';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { CardParams } from '../../types/CardParams';
import { ProductShort } from '../../types/ProductShort';
import { NamesByLinks } from '../../types/NamesByLinks';
import { handlerChangeContext } from '../../helpers/handlerChangeContext';
import { LikeAndCartContext } from '../../helpers/LikeAndCartContext';
import { KeysOfStorage } from '../../types/KeysOfStorage';
import { BASE_URL } from '../../helpers/consts';
import { getState } from '../../helpers/getState';

type Props = {
  product: ProductShort,
  numLiked: number,
  onSetNumLiked: (num: number) => void,
  numAdded: number,
  onSetNumAdded: (num: number) => void,
};

export const ProductCard: React.FC<Props> = ({
  product, numLiked, onSetNumLiked, numAdded, onSetNumAdded,
}) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    phoneId,
  } = product;

  const {
    liked,
    setLiked,
    addedToCart,
    setAddedToCart,
  } = useContext(LikeAndCartContext);
  const quantityInCart = addedToCart.filter(id => id === phoneId).length;

  const [isLiked, setIsLiked] = useState<boolean>(liked.includes(phoneId));
  const [isAdded, setIsAdded] = useState<boolean>(addedToCart
    .includes(phoneId));

  const { pathname, search } = useLocation();

  const handlerClickLike = () => {
    handlerChangeContext(phoneId, liked, setLiked, KeysOfStorage.Like);
    setIsLiked(!isLiked);
    if (isLiked) {
      onSetNumLiked(numLiked - 1);
    } else {
      onSetNumLiked(numLiked + 1);
    }
  };

  const handlerClickAddToCart = () => {
    const key = KeysOfStorage.Cart;

    handlerChangeContext(phoneId, addedToCart, setAddedToCart, key);
    setIsAdded(!isAdded);
    if (isAdded) {
      onSetNumAdded(numAdded - quantityInCart);
    } else {
      onSetNumAdded(numAdded + 1);
    }
  };

  return (
    <div className="product-card">
      <Link
        to={`${NamesByLinks.Phones}/${phoneId}`}
        state={getState(pathname, search)}
      >
        <img
          src={`${BASE_URL}/${image}`}
          alt={`${BASE_URL}/${image}`}
          className="product-card__img"
        />
      </Link>

      <div className="product-card__name">{name}</div>

      {price !== fullPrice ? (
        <div className="product-card__prices">
          <span className="product-card__discount-price">
            {`$${price}`}
          </span>

          <span className="product-card__price">
            {`$${fullPrice}`}
          </span>
        </div>
      ) : (
        <div className="product-card__prices">
          <span className="product-card__discount-price">
            {`$${price}`}
          </span>
        </div>
      )}

      <ul>
        <li className="product-card__param">
          <span className="product-card__param--name">
            {CardParams.Screen}
          </span>

          <span className="product-card__param--value">
            {screen}
          </span>
        </li>

        <li className="product-card__param">
          <span className="product-card__param--name">
            {CardParams.Capacity}
          </span>

          <span className="product-card__param--value">
            {capacity}
          </span>
        </li>

        <li className="product-card__param">
          <span className="product-card__param--name">
            {CardParams.Ram}
          </span>

          <span className="product-card__param--value">
            {ram}
          </span>
        </li>
      </ul>

      <div className="selection-buttons">
        <button
          type="button"
          className={classNames(
            'selection-buttons__add',
            { 'is-selected': isAdded },
          )}
          onClick={handlerClickAddToCart}
        >
          {isAdded ? 'Added to card' : 'Add to card'}
        </button>

        <button
          type="button"
          aria-label="like card"
          className={classNames(
            'selection-buttons__like',
            { 'is-selected': isLiked },
          )}
          onClick={handlerClickLike}
          data-cy="addToFavorite"
        />
      </div>
    </div>
  );
};
