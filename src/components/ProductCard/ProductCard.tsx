import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';
import classNames from 'classnames';
import { FavoritesContext } from '../../helpers/FavoritesContext';
import { CartContext } from '../../helpers/CartContext';
import ItemOptions from '../../helpers/ItemOptions';
import FILTER from '../../helpers/FILTERS';

type Props = {
  phone: Item;
};

const ProductCard: React.FC<Props> = ({ phone }) => {
  const {
    price, ram, imageUrl, discount, name, screen, capacity, id, type,
  } = phone;
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const { isAddedToCart, addToCart, removeFromCart } = useContext(CartContext);
  const [itemType, setItemType] = useState('phones');

  const priceWithDiscount = price - (price * (discount / 100));

  useEffect(() => {
    switch (type) {
      case FILTER.phone:
        setItemType('phones');
        break;
      case FILTER.tablet:
        setItemType('tablets');
        break;
      case FILTER.accessories:
        setItemType('accessories');
        break;
      default:
        setItemType('phones');
    }
  }, [phone]);

  return (
    <div className="item">
      <Link to={`/${itemType}/${id}`} className="item__picture">
        <img className="item__img" src={imageUrl} alt="item" />
      </Link>
      <Link to={`/${itemType}/${id}`} className="item__title">
        {name}
      </Link>
      <span className="item__price">
        <p className="item__price-discount">{`$${priceWithDiscount}`}</p>
        <p className="item__price-value">
          {(price === priceWithDiscount)
            ? '' : (`$${price}`)}
        </p>
      </span>
      <div className="description item__description">
        <ItemOptions title="Screen" itemInfo={screen} />
        <ItemOptions title="Capacity" itemInfo={capacity} />
        <ItemOptions title="Ram" itemInfo={ram} />
      </div>
      <div className="item__button">
        <input
          className={classNames('item__button-add-to-cart', { 'item__button-add-to-cart-selected': isAddedToCart(phone) })}
          type="button"
          value={isAddedToCart(phone) ? 'Added to cart' : 'Add to cart'}
          onClick={() => {
            if (isAddedToCart(phone)) {
              removeFromCart(phone);
            } else {
              addToCart(phone);
            }
          }}
        />
        <label
          className="item__button-favorite"
          htmlFor={`button-favorite-${id}`}
        >
          <input
            className="item__button-favorite-input"
            type="checkbox"
            checked={isFavorite(phone)}
            id={`button-favorite-${id}`}
            onChange={(event) => {
              if (event.target.checked) {
                addFavorite(phone);
              } else {
                removeFavorite(phone);
              }
            }}
          />
          <span className="item__button-favorite-check" />
        </label>
      </div>
    </div>
  );
};

export default ProductCard;
