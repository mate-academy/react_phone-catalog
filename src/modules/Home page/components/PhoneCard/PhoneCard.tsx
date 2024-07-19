import React, { useEffect, useState } from 'react';
import './PhoneCard.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
  addInCart,
  addInFavorites,
  deleteFavorite,
  deleteFromCart,
} from '../../../../features/User/userSlice';
import { ProductType } from '../../../../types/ProductType';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

interface Props {
  product: ProductType;
  isHot?: boolean;
}

export const PhoneCard: React.FC<Props> = ({ product, isHot }) => {
  const [isAddedInCart, setIsAddedInCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { cart, favorites } = useAppSelector(state => state.user);
  const { theme } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const handleAddToCart = async () => {
    if (cart.some(item => item.itemId === product.itemId) && isAddedInCart) {
      dispatch(deleteFromCart(product.itemId));
      setIsAddedInCart(false);

      return;
    }

    const item: ProductType = {
      ...product,
      quantity: 1,
    };

    dispatch(addInCart(item));
  };

  const handleFavorited = async () => {
    if (favorites.some(item => item.itemId === product.itemId) && isFavorited) {
      dispatch(deleteFavorite(product.itemId));
      setIsFavorited(false);

      return;
    }

    dispatch(addInFavorites(product));
  };

  useEffect(() => {
    const isAdded =
      Array.isArray(cart) && cart.some(item => item.itemId === product.itemId);

    setIsAddedInCart(isAdded);

    const favourites =
      Array.isArray(favorites) &&
      favorites.some(item => item.itemId === product.itemId);

    setIsFavorited(favourites);
  }, [cart, favorites, product.itemId]);

  return (
    <article className="phone-card">
      <Link to={`/product/${product.category}/${product.itemId}`}>
        <div className="phone-card__container">
          <div className="phone-card__image-wrapper">
            <img
              src={product.image || product.images[0]}
              alt={product.itemId}
              className="phone-card__image"
            />
          </div>
          <h2 className="phone-card__title">{product.name}</h2>
          <p className="phone-card__price">
            ${product.price || product.priceDiscount}
            {isHot && (
              <span className="phone-card__price--hot">
                ${product.fullPrice || product.priceRegular}
              </span>
            )}
          </p>
          <div className="phone-card__specs">
            <div className="phone-card__spec">
              <span className="phone-card__spec-label">Screen</span>
              <span className="phone-card__spec-value">{product.screen}</span>
            </div>
            <div className="phone-card__spec">
              <span className="phone-card__spec-label">Capacity</span>
              <span className="phone-card__spec-value">{product.capacity}</span>
            </div>
            <div className="phone-card__spec">
              <span className="phone-card__spec-label">RAM</span>
              <span className="phone-card__spec-value">{product.ram}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="phone-card__buttons">
        <button
          className={classNames('phone-card__button', {
            'phone-card__button--added': isAddedInCart,
          })}
          onClick={handleAddToCart}
        >
          {isAddedInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={classNames('icon icon--favourites--button', {
            'icon--favourites--button-active': isFavorited,
          })}
          onClick={handleFavorited}
        >
          <img
            src={`nav/favourites${isFavorited ? ' red' : ''}${theme === 'dark' ? '-dark' : ''}.svg`}
            alt="favourites"
          />
        </button>
      </div>
    </article>
  );
};
