import React from 'react';
import style from './ProductCart.module.scss';
import { Favorite } from '../../shared/Favorite/Favorite';
import { Product } from '../../type/Product';
import { useCart } from '../../modules/HomePage/hook/CartContext';

type Props = {
  product: Product;
  isDiscount?: boolean;
};

export const ProductCart: React.FC<Props> = ({ product, isDiscount }) => {
  const cartContext = useCart();

  if (!cartContext) {
    return 'CartContext is not loaded';
  }

  const { addToCart, cart } = cartContext;

  return (
    <>
      <div className={style.card}>
        <img src={product.images[0]} alt="phone img" className={style.phoneImg} />

        <h2 className={style.phoneTitle}>{product.name}</h2>

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
            <p className={style.propertieDescription}>{product.screen}</p>
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
          {!cart.includes(product) ? (
            <button className={style.addToCart} onClick={() => addToCart(product)}>
              Add to cart
            </button>
          ) : (
            <button className={style.addedCart} disabled >
              Added
            </button>
          )}
          <div className={style.favorite}>
            <Favorite />
          </div>
        </div>
      </div>
    </>
  );
};
