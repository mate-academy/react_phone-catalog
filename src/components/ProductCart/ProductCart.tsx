import React from 'react';
import style from './ProductCart.module.scss';
import favouriteIcon from '../../shared/icons/favourites-heart-like.svg';
// eslint-disable-next-line max-len
import addedFavouriteIcon from '../../shared/icons/favourites-filled-heart-like.svg';
import { Product } from '../../types/Products';
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  isDiscount?: boolean;
};

export const ProductCart: React.FC<Props> = ({
  product,
  isDiscount = false,
}) => {
  const cartContext = useCart();

  if (!cartContext) {
    return 'CartContext is not loading';
  }

  const { cart, addToCart, favourite, toggleFavourite } = cartContext;

  const isCartAdd = cart.some(item => item.id === product.id);
  const isCartFavourite = favourite.some(item => item.id === product.id);

  const categoryMap: { [key: string]: string } = {
    phones: 'phones',
    tablets: 'tablets',
    accessories: 'accessories',
  };

  const selectCategory = categoryMap[product.category] || '';

  // eslint-disable-next-line no-console
  console.log('selected category:', selectCategory);

  return (
    <>
      <div className={style.card}>
        <Link to={`/${selectCategory}/${product.itemId}`}>
          <img src={product.image} alt="phone img" className={style.phoneImg} />

          <h2 className={style.phoneTitle} title={product.name}>
            {product.name}
          </h2>
        </Link>

        <p className={style.phonePrice}>
          {isDiscount ? (
            <>
              {`$${product.price}     `}

              <span
                className={style.phonePriceDiscount}
              >{`$${product.fullPrice}`}</span>
            </>
          ) : (
            <>{`$${product.fullPrice}`}</>
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
          {isCartAdd ? (
            <button className={style.addedCart} disabled>
              Added
            </button>
          ) : (
            <button
              className={style.addToCart}
              onClick={() => addToCart(product, isDiscount)}
            >
              Add to cart
            </button>
          )}

          <div
            className={`${isCartFavourite ? `${style.favoriteActive}` : `${style.favorite}`}`}
            onClick={() => toggleFavourite(product, isDiscount)}
          >
            <img
              src={isCartFavourite ? addedFavouriteIcon : favouriteIcon}
              alt="favourite icon"
              className={style.favouriteIcon}
            />
          </div>
        </div>
      </div>
    </>
  );
};
