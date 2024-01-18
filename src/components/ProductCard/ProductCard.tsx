/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { BASE_URL } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToCart, addToFavourites, removeFavourite, removeFromCart,
} from '../../features/product/productSlice';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { cart, favourites } = useAppSelector(state => state.phones);

  const [inCart, setInCart] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const {
    id,
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const handleAdd = (key: string) => {
    const valid = key === 'cart' ? cart : favourites;

    dispatch(key === 'cart' ? addToCart(product) : addToFavourites(product));

    localStorage.setItem(key,
      JSON.stringify([...valid, product]));
  };

  const handleDelete = (key: string) => {
    const valid = key === 'cart' ? cart : favourites;

    dispatch(key === 'cart'
      ? removeFromCart(product)
      : removeFavourite(product));

    localStorage.setItem(key,
      JSON.stringify([...valid
        .filter(pr => pr.id !== id)]));
  };

  useEffect(() => {
    const addedToCart = cart.find(pr => pr.id === id);
    const addedToFavourite = favourites.find(favourite => favourite.id === id);

    setInCart(!!addedToCart);
    setIsFavourite(!!addedToFavourite);
  }, [cart, id, favourites]);

  return (
    <div className="product-card">
      <Link to={`/${category}/${itemId}`}>
        <div className="product-card__image">
          <img src={`${BASE_URL}/${image}`} alt=" " className="product-card__image-phone" />
        </div>

        <p className="product-card__model">
          {name}
        </p>
      </Link>

      <div className="product-card__prices">
        <p className="product-card__price">{`$${price}`}</p>
        <p className="product-card__discount">{`$${fullPrice}`}</p>
      </div>

      <div className="product-card__about">
        <div className="product-card__about-container">
          <p className="product-card__about-name">Screen</p>
          <p className="product-card__about-spec">{screen}</p>
        </div>

        <div className="product-card__about-container">
          <p className="product-card__about-name">Capacity</p>
          <p className="product-card__about-spec">{capacity}</p>
        </div>

        <div className="product-card__about-container">
          <p className="product-card__about-name">RAM</p>
          <p className="product-card__about-spec">{ram}</p>
        </div>
      </div>

      <div className="product-card__buttom">
        {inCart ? (
          <button
            className="product-card__button product-card__button--added"
            type="button"
            onClick={() => handleDelete('cart')}
          >
            Added to cart
          </button>
        ) : (
          <button
            className="product-card__button"
            type="button"
            onClick={() => handleAdd('cart')}
          >
            Add to cart
          </button>
        )}

        <button
          className={cn('product-card__favourites', {
            'product-card__favourites--added': isFavourite,
          })}
          aria-label="like"
          type="button"
          onClick={isFavourite
            ? () => handleDelete('favourites')
            : () => handleAdd('favourites')}
        >
          <div
            className={cn('icon', {
              'icon-favourites-like': isFavourite,
              'icon-favourites': !isFavourite,
            })}
          />
        </button>
      </div>
    </div>
  );
};
