import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button } from '../Button/Button';
import { Product } from '../../types/Product';
import { SectionName } from '../../types/SectionName';
import { addToCart, removeFromCard } from '../../features/cartSlice';
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from '../../features/favoritesSlice';

import './ProductCard.scss';

type Props = {
  sectionTitle: SectionName;
  product: Product;
};

export const ProductCard: FC<Props> = ({ sectionTitle, product }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector(state => state.favorites);
  const { cartItems } = useAppSelector(state => state.cart);

  const isFavorite = useMemo(() => {
    return favorites.some(item => item.id === product.id);
  }, [favorites]);
  const isInCart = useMemo(() => {
    return cartItems.some(item => item.id === product.id);
  }, [cartItems]);

  const handleAddToFavoritesClick = () => {
    if (!isFavorite) {
      dispatch(addFavoriteProduct(product));
    } else {
      dispatch(removeFavoriteProduct(product));
    }
  };

  const handleAddToCartClick = () => {
    if (!isInCart) {
      dispatch(addToCart({ ...product, quantity: 1 }));
    } else {
      dispatch(removeFromCard(product));
    }
  };

  const {
    itemId,
    category,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  return (
    <div className="card" data-cy="cardsContainer">
      <Link
        to={`/${category}/${itemId}`}
        className="card__link"
      >
        <img
          src={`new/${image}`}
          alt={name}
          className="card__img"
        />
        <h2 className="card__title">{name}</h2>
      </Link>

      <div className="card__price">
        {sectionTitle === SectionName.BrandNew ? (
          <p className="card__price-regular">{`$${fullPrice}`}</p>
        ) : (
          <>
            <p className="card__price-regular">{`$${price}`}</p>
            <p className="card__price-discount">{`$${fullPrice}`}</p>
          </>
        )}

      </div>

      <div className="card__specs-container">
        <div className="card__specs">
          <p className="card__specs-title">Screen</p>
          <p className="card__specs-value">{screen}</p>
        </div>
        <div className="card__specs">
          <p className="card__specs-title">Capacity</p>
          <p className="card__specs-value">{capacity}</p>
        </div>
        <div className="card__specs">
          <p className="card__specs-title">RAM</p>
          <p className="card__specs-value">{ram}</p>
        </div>
      </div>

      <div className="card__buttons">
        <Button
          content={isInCart ? 'Added to cart' : 'Add to cart'}
          className={classNames('add-to-cart', {
            'button--add-to-cart--active': isInCart,
          })}
          onClick={handleAddToCartClick}
        />
        <Button
          dataCy="addToFavorite"
          className={classNames('favorites', {
            'button--favorites--active': isFavorite,
          })}
          iconType={isFavorite ? 'favorites-filled' : 'favorites'}
          onClick={handleAddToFavoritesClick}
        />
      </div>
    </div>
  );
};
