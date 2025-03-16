import React from 'react';
import style from './ProductCart.module.scss';
import { Product } from '../../type/Product';
import { useCart } from '../../modules/HomePage/hook/CartContext';
import favouriteIcon from '../../shared/assets/icons/favourites-heart-like.svg';
import favouriteIconActive from '../../shared/assets/icons/favourites-filled-heart-like.svg';

type Props = {
  product: Product;
  isDiscount?: boolean;
};

export const ProductCart: React.FC<Props> = ({ product, isDiscount = false }) => {
  const cartContext = useCart();

  if (!cartContext) {
    return 'CartContext is not loaded';
  }

  const { addToCart, cart, toggleFavourite, favourite } = cartContext;
  const isFavorite = favourite.some(item => item.id === product.id);

  return (
    <>
      <div className={style.card}>
        <img src={product.images[0]} alt="phone img" className={style.phoneImg} />

        <h2 className={style.phoneTitle} title={product.name}>
          {product.name}
        </h2>

        <p className={style.phonePrice}>
          {isDiscount ? (
            <>
              {`$${product.priceDiscount}     `}

              <span className={style.phonePriceDiscount}>{`$${product.priceRegular}`}</span>
            </>
          ) : (
            <>{`$${product.priceRegular}`}</>
          )}
        </p>

        <div className={style.phoneDescription}>
          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>Screen</p>
            <p className={style.propertieDescription} title={product.screen}>
              {product.screen}
            </p>
          </div>

          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>Capacity</p>
            <p className={style.propertieDescription}>{product.capacity}</p>
          </div>

          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>RAM</p>
            <p className={style.propertieDescription}>{product.ram}</p>
          </div>
        </div>

        <div className={style.phoneFooter}>
          {!cart.some(item => item.id === product.id) ? (
            <button className={style.addToCart} onClick={() => addToCart(product, isDiscount)}>
              Add to cart
            </button>
          ) : (
            <button className={style.addedCart} disabled>
              Added
            </button>
          )}
          <div
            className={`${isFavorite ? `${style.favoriteActive}` : `${style.favorite}`}`}
            onClick={() => toggleFavourite(product)}
          >
            <img
              src={isFavorite ? favouriteIconActive : favouriteIcon}
              alt="favourite icon"
              className={style.favouriteIcon}
            />
          </div>
        </div>
      </div>
    </>
  );
};
