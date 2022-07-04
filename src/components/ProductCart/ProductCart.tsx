import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductCart.scss';
import classNames from 'classnames';
import { StateContext, DispatchContext } from '../../StateProvider';
import { CartItem, Item } from '../../types';

type Props = {
  item: Item;
};

const ProductCart:React.FC<Props> = ({ item }) => {
  const dispatch = useContext(DispatchContext);
  const { cartItems, favoriteItems } = useContext(StateContext);

  const addOrDeleteItemInCart = (itemData: Item) => {
    dispatch({ type: 'addOrDeleteItemInCart', item: itemData });
  };

  const addOrDeleteItemInFavorite = (itemData: Item) => {
    dispatch({ type: 'addOrDeleteItemInFavorite', item: itemData });
  };

  const checkInCart = cartItems.some((itemData: CartItem) => {
    return item.id === itemData.product.id;
  });

  const checkInFavorites = favoriteItems.some((itemData: CartItem) => {
    return item.id === itemData.product.id;
  });

  const {
    name,
    price,
    discount,
    imageUrl,
    screen,
    capacity,
    ram,
    id,
    type,
  } = item;

  const priceWithDiscount = price - ((price / 100) * discount);

  const capacityInGb = parseInt(capacity, 10) / 1000;

  const ramInGb = parseInt(ram, 10) / 1000;

  const getUrl = () => {
    switch (type) {
      case 'phone':
        return 'phones';
      case 'tablet':
        return 'tablets';
      case 'accessory':
        return 'accessory';
      default:
        return '';
    }
  };

  const url = getUrl();

  return (
    <li className="productCart">
      <Link to={`/${url}/${id}`} className="productCart__link">
        <div className="productCart__border" />
        <img
          className="productCart__img"
          src={imageUrl}
          alt={imageUrl}
        />

        <span className="productCart__title">{name}</span>
      </Link>

      <div className="productCart__allPrice">
        <span className="productCart__price">
          {`$${priceWithDiscount}`}
        </span>
        {discount > 0 && (
          <span className="productCart__discount">
            {`$${price}`}
          </span>
        )}
      </div>

      <div className="productCart__line" />

      <div className="productCart__info">
        <div className="productCart__props">
          <span className="productCart__props-title">
            Screen
          </span>
          <span className="productCart__props-data">
            { screen }
          </span>
        </div>

        <div className="productCart__props">
          <span className="productCart__props-title">
            Capacity
          </span>
          <span className="productCart__props-data">
            {capacity ? `${capacityInGb} GB` : '-'}
          </span>
        </div>

        <div className="productCart__props">
          <span className="productCart__props-title">
            RAM
          </span>
          <span className="productCart__props-data">
            {ram ? `${ramInGb} GB` : '-'}
          </span>
        </div>
      </div>

      <div className="productCart__btns">
        <button
          type="button"
          className={classNames(
            'productCart__btn',
            { 'productCart__btn--act': checkInCart },
          )}
          onClick={() => addOrDeleteItemInCart(item)}
        >
          {checkInCart ? 'Remove from cart' : 'Add to cart'}
        </button>

        <i
          role="button"
          tabIndex={0}
          aria-label="btn-like"
          className={classNames(
            'productCart__btn-like',
            { 'productCart__btn-like--act': checkInFavorites },
          )}
          onClick={() => addOrDeleteItemInFavorite(item)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              addOrDeleteItemInFavorite(item);
            }
          }}
        />
      </div>

    </li>
  );
};

export default ProductCart;
