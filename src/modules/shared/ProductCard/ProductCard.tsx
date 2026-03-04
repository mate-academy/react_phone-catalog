import cn from 'classnames';
import card from './ProductCard.module.scss';
import { Product } from '../../../types/Product';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollToSectContext } from '../../../contexts/ScrollToSectContext';
import { AddToCartContext } from '../../../contexts/AddToCartContext';
import { AddToFavContext } from '../../../contexts/AddToFavContext';
import { CartProduct } from '../../../types/CartProduct';

type Props = {
  product: Product;
  isFullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  isFullPrice = false,
}) => {
  const { scrollToSect } = useContext(ScrollToSectContext);
  const { cart, setCart } = useContext(AddToCartContext);
  const { fav, setFav } = useContext(AddToFavContext);
  const cartProduct: CartProduct = {
    ...product,
    quantity: 1,
  };
  const [isPicked, setIsPicked] = useState(
    cart.some(item => item.itemId === product.itemId),
  );

  const handleCart = () => {
    if (cart.some(p => p.itemId === cartProduct.itemId)) {
      setCart(currCart =>
        currCart.filter(item => item.itemId !== product.itemId),
      );
    } else {
      setCart(currCart => [...currCart, cartProduct]);
    }

    setIsPicked(!isPicked);
  };

  const handleFav = () => {
    setFav(currFav =>
      currFav.some(item => item.itemId === product.itemId)
        ? currFav.filter(item => item.itemId !== product.itemId)
        : [...currFav, product],
    );
  };

  return (
    <article className={card.card}>
      <div className={card.card__wrapper}>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={card.card__img}
          onClick={() => scrollToSect('top')}
        >
          <img
            src={product.image}
            alt={product.itemId}
            className={card.card__img}
          />
        </Link>

        <Link
          to={`/${product.category}/${product.itemId}`}
          className={card.card__title}
          onClick={() => scrollToSect('top')}
        >
          {product.name}
        </Link>

        <div className={card.card__prices}>
          {product.price !== product.fullPrice && isFullPrice === false ? (
            <>
              <p className={card.card__price}>${product.price}</p>
              <p className={cn(card.card__price, card['card__price--full'])}>
                ${product.fullPrice}
              </p>
            </>
          ) : (
            <p className={card.card__price}>${product.fullPrice}</p>
          )}
        </div>

        <div className={card.card__line}></div>
        <section className={card.card__details}>
          <div className={card['card__details-content']}>
            <article className={cn(card.card__detail, card.detail)}>
              <p className={card.detail__title}>Screen</p>
              <p className={card.detail__desc}>{product.screen}</p>
            </article>
            <article className={cn(card.card__detail, card.detail)}>
              <p className={card.detail__title}>Capacity</p>
              <p className={card.detail__desc}>{product.capacity}</p>
            </article>
            <article className={cn(card.card__detail, card.detail)}>
              <p className={card.detail__title}>RAM</p>
              <p className={card.detail__desc}>{product.ram}</p>
            </article>
          </div>
        </section>
        <div className={card.card__buttons}>
          {!isPicked ? (
            <button
              type="button"
              className={card['card__add-to-cart']}
              onClick={handleCart}
            >
              Add to cart
            </button>
          ) : (
            <button
              type="button"
              className={cn(
                card['card__add-to-cart'],
                card['card__add-to-cart--picked'],
              )}
              onClick={handleCart}
            >
              Added
            </button>
          )}
          <button
            type="button"
            className={cn(card['card__add-to-fav'], {
              [card['card__add-to-fav--active']]: fav.some(
                item => item.itemId === product.itemId,
              ),
            })}
            onClick={handleFav}
          ></button>
        </div>
      </div>
    </article>
  );
};
