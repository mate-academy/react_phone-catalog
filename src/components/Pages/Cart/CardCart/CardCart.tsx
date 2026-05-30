import React, { useEffect } from 'react';
import { Product } from '../../../type/Product';
import cn from 'classnames';
import './CardCart.scss';
import '../../../text.scss';
import { useCart } from '../../../Context/CartContext';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
  quantity: number;
};

export const CardCart: React.FC<Props> = ({ product, quantity }) => {
  const { cartList, setCartList } = useCart();

  const addFromCart = (cartProduct: Product) => {
    if (cartList) {
      setCartList({
        ...cartList,
        [cartProduct.id]: {
          ...cartList[cartProduct.id],
          quantity: cartList[cartProduct.id].quantity + 1,
        },
      });
    }
  };

  const removeOneFromCart = (cartProduct: Product) => {
    if (cartList) {
      setCartList({
        ...cartList,
        [cartProduct.id]: {
          ...cartList[cartProduct.id],
          quantity: cartList[cartProduct.id].quantity - 1,
        },
      });
    }
  };

  const removeFromCart = (cartProduct: Product) => {
    if (cartList) {
      const { [cartProduct.id]: removedProduct, ...rest } = cartList;

      setCartList(rest);
    }
  };

  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get('lang') || 'en';

  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  return (
    <article className="cart__card">
      <div className="cart__card__row">
        <button
          className="button__cart--delete"
          onClick={() => removeFromCart(product)}
        ></button>
        <Link
          className="card__link"
          to={`/${product.category}/${product.itemId}?lang=${currentLanguage}`}
        >
          <img
            className="cart__card__photo"
            src={`/react_phone-catalog/${product.image}`}
            alt="product image"
          />
        </Link>
        <Link
          className="card__link"
          to={`/${product.category}/${product.itemId}`}
        >
          <h2 className="cart__card__title text--body">{product.name}</h2>
        </Link>
      </div>
      <div className="cart__card__row">
        <div className="button__cart__block text--body">
          <button
            className={cn('slider__button', 'button__cart--minus', {
              'slider__button--no-active': quantity <= 1,
              'button__cart--minus--no-active': quantity <= 1,
            })}
            onClick={() => {
              if (quantity > 1) {
                removeOneFromCart(product);
              }
            }}
          ></button>
          <span className="cart__card__quantity">{quantity}</span>
          <button
            className="slider__button button__cart--plus"
            onClick={() => addFromCart(product)}
          ></button>
        </div>
        <h3 className="cart__card__price text--h3">${product.price}</h3>
      </div>
    </article>
  );
};
