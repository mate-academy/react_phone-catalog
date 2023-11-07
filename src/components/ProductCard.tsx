import { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Button } from './Button';
import { Product } from '../types/Product';
import { ButtonType } from '../types/ButtonType';
import { ProductsCardType } from '../types/ProductsCardType';

import { useAppDispatch, useAppSelector } from '../utils/hooks/hooks';
import {
  addToFavourites,
  deleteFromFavourites,
} from '../store/slices/favouritesSlice';

import '../styles/blocks/ProductCard.scss';
import { addToCart } from '../store/slices/cartSlice';

type Props = {
  product: Product;
  transform?: string;
  type: ProductsCardType;
};

export const ProductCard: React.FC<Props> = ({ product, transform, type }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;

  const { favourites } = useAppSelector((state) => state.favourites);
  const { cartItems } = useAppSelector((state) => state.cartItems);
  const dispatch = useAppDispatch();

  const hasInFavourites = useMemo(() => {
    return favourites.some((fav) => fav.id === product.id);
  }, [favourites, product]);

  const hasInCart = useMemo(() => {
    return cartItems.some(item => item.id === product.id);
  }, [cartItems, product]);

  const handleFavouritesChange = useCallback(() => {
    if (hasInFavourites) {
      dispatch(deleteFromFavourites(product.id));
    } else {
      dispatch(addToFavourites(product));
    }
  }, [hasInFavourites]);

  const handleCartItemsChange = useCallback((prod: Product) => {
    if (hasInCart) {
      return;
    }

    dispatch(addToCart(prod));
  }, [hasInCart]);

  return (
    <div className="productCard" data-cy="cardsContainer" style={{ transform }}>
      <div className="productCard__container">
        <Link to={`/${category}/${itemId}`}>
          <img
            src={`./_new/${image}`}
            alt={name}
            className="productCard__image"
          />

          <h3 className="productCard__title">{name}</h3>
        </Link>

        <div className="productCard__price">
          {type === ProductsCardType.DISCOUNT ? (
            <>
              <span className="productCard__price-main">{`$${price}`}</span>
              <span className="productCard__price-discount">
                {`$${fullPrice}`}
              </span>
            </>
          ) : (
            <span className="productCard__price-main">{`$${fullPrice}`}</span>
          )}
        </div>

        <ul className="productCard__info">
          <li className="productCard__text">
            <span className="productCard__text-title">Screen</span>
            <span className="productCard__text-value">{screen}</span>
          </li>

          <li className="productCard__text">
            <span className="productCard__text-title">Capacity</span>
            <span className="productCard__text-value">{capacity}</span>
          </li>

          <li className="productCard__text">
            <span className="productCard__text-title">RAM</span>
            <span className="productCard__text-value">{ram}</span>
          </li>
        </ul>

        <div className="productCard__buttons">
          <Button
            content={ButtonType.TEXT}
            onClick={() => handleCartItemsChange(product)}
            className={cn({ active: hasInCart })}
            disabled={hasInCart}
          >
            {hasInCart
              ? 'Added to cart'
              : 'Add to cart'}
          </Button>

          <Button
            content={ButtonType.FAVOURITES}
            data-cy="addToFavorite"
            onClick={handleFavouritesChange}
            className={cn({ active: hasInFavourites })}
          />
        </div>
      </div>
    </div>
  );
};
