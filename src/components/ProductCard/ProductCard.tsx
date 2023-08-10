import classNames from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from '../../types/phone';
import { DispatchContext, StateContext } from '../Store';

import './style.scss';

type Props = {
  data: Phone,
  discount?: boolean,
};

export const ProductCard: React.FC<Props> = ({ data, discount = true }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    phoneId,
  } = data;

  const dispatch = useContext(DispatchContext);
  const { cartItems, favoriteItems } = useContext(StateContext);

  const inCart = cartItems.some((el) => (
    el.id === phoneId
  ));

  const inFavorite = favoriteItems.some((el) => (
    el.phoneId === phoneId
  ));

  const updateItemsInCartContext = (isInCart: boolean) => {
    if (isInCart) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: cartItems.map((el) => {
          if (el.id === phoneId) {
            return (
              {
                id: phoneId,
                quantity: el.quantity + 1,
                product: data,
                discount,
              }
            );
          }

          return el;
        }),
      });
    } else {
      dispatch({
        type: 'ADD_TO_CART',
        payload: cartItems.concat({
          id: phoneId,
          quantity: 1,
          product: data,
          discount,
        }),
      });
    }
  };

  const updateFavoriteInContext = (isInFavorite: boolean) => {
    if (isInFavorite) {
      dispatch({
        type: 'UPDATE_FAVORITES',
        payload: favoriteItems
          .filter((el) => el.phoneId !== phoneId),
      });
    } else {
      dispatch({
        type: 'UPDATE_FAVORITES',
        payload: favoriteItems.concat(data),
      });
    }
  };

  return (
    <div className="productCard">
      <Link to={`/phones/${phoneId}`} className="productCard__link">
        <div className="productCard__image image">
          <img
            src={`_new/${image}`}
            alt={name}
            className="image__item"
          />
        </div>
        <div className="productCard__nameWrapper">
          <span className="productCard__name">{name}</span>
        </div>
        <div className="productCard__prices price">
          {discount ? (
            <>
              <span className="price__current">{price}</span>
              <span className="price__old">{fullPrice}</span>
            </>
          ) : (
            <span className="price__current">{fullPrice}</span>
          )}
        </div>
        <span className="productCard__underline" />
        <div className="productCard__specs details">
          <div className="details__parts">
            <p className="details__part">Screen</p>
            <p className="details__part">Capacity</p>
            <p className="details__part">RAM</p>
          </div>
          <div className="details__values">
            <p className="details__value">{screen}</p>
            <p className="details__value">{capacity}</p>
            <p className="details__value">{ram}</p>
          </div>
        </div>
      </Link>
      <div className="productCard__buttons">
        <button
          type="button"
          onClick={() => updateItemsInCartContext(inCart)}
          className={
            classNames('productCard__button-add', {
              'productCard__button-add--includes': inCart,
            })
          }
        >
          { inCart ? 'Added to cart' : 'Add to cart' }
        </button>

        <button
          className="productCard__button-favorite"
          type="button"
          data-cy="addToFavorite"
          aria-label="add-to-favorite"
          onClick={() => updateFavoriteInContext(inFavorite)}
        >
          <span className={classNames(
            'icon icon-hearth',
            { 'icon-hearth--selected': inFavorite },
          )}
          />
        </button>
      </div>
    </div>
  );
};
