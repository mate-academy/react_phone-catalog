import React, { useContext } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import card from './ProductCard.module.scss';
import { Product } from '../../../types/Product';
import { FavouritesContext } from '../../../contexts/FavouritesContext';
import { CartContext } from '../../../contexts/CartContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext);
  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);

  const isActive = isFavourite(product.itemId);
  const isInCartAlready = isInCart(product.itemId);

  return (
    <article className={card.card}>
      <div className={card.card__wrapper}>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={card.card__img}
        >
          <img
            src={product.image}
            alt={product.itemId}
            className={card.card__img}
          />
        </Link>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={card.card__name}
        >
          {product.name}
        </Link>
        <div className={card.card__prices}>
          {product.year !== 2022 ? (
            <>
              <span className={card.card__price}>{`$${product.price}`}</span>
              <span className={cn(card.card__price, card['card__price--full'])}>
                {`$${product.fullPrice}`}
              </span>
            </>
          ) : (
            <div className={card.card__price}>{`$${product.fullPrice}`}</div>
          )}
        </div>
        <div className={card.card__line}></div>
        <section className={card.card__details}>
          <article className={card.details}>
            <span className={card.details__title}>Screen</span>
            <span className={card.details__value}>{product.screen}</span>
          </article>
          <article className={card.details}>
            <span className={card.details__title}>Capacity</span>
            <span className={card.details__value}>{product.capacity}</span>
          </article>
          <article className={card.details}>
            <span className={card.details__title}>RAM</span>
            <span className={card.details__value}>{product.ram}</span>
          </article>
        </section>
        <div className={card.card__buttons}>
          {isInCartAlready ? (
            <button
              type="button"
              className={card.card__buttonAddedToCart}
              onClick={() => {
                removeFromCart(product.itemId);
              }}
            >
              Added to cart
            </button>
          ) : (
            <button
              type="button"
              className={card.card__buttonAddToCart}
              onClick={() => {
                addToCart(product);
              }}
            >
              Add to cart
            </button>
          )}
          <button
            type="button"
            className={cn(card.card__buttonAddToFav, {
              [card.card__buttonAddToFav__active]: isActive,
            })}
            onClick={() => toggleFavourite(product)}
          ></button>
        </div>
      </div>
    </article>
  );
};
