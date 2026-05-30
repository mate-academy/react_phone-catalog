import React from 'react';
import './CardButton.scss';
import { Product } from '../../type/Product';
import { useCart } from '../../Context/CartContext';
import { useFavourites } from '../../Context/FavouritesContext';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
  isBigCard: boolean;
};

export const CardButton: React.FC<Props> = ({ product, isBigCard }) => {
  const { cartList, setCartList } = useCart();
  const { favouriteList, setFavouriteList } = useFavourites();
  const { t } = useTranslation();
  const isActiveCard = cartList ? product.id in cartList : false;
  const isActiveFavorites = favouriteList
    ? favouriteList.some(item => item.id === product.id)
    : false;

  const addToCart = (prod: Product) => {
    if (cartList) {
      if (prod.id in cartList) {
        setCartList({
          ...cartList,
          [prod.id]: {
            ...cartList[prod.id],
            quantity: cartList[prod.id].quantity + 1,
          },
        });
      } else {
        setCartList({
          ...cartList,
          [prod.id]: { product: prod, quantity: 1 },
        });
      }
    }
  };

  const removeFromCart = (prod: Product) => {
    if (cartList) {
      if (prod.id in cartList && cartList[prod.id].quantity > 1) {
        setCartList({
          ...cartList,
          [prod.id]: {
            ...cartList[prod.id],
            quantity: cartList[prod.id].quantity - 1,
          },
        });
      } else {
        const { [prod.id]: removedProduct, ...rest } = cartList;

        setCartList(rest);
      }
    }
  };

  const addToFavourites = (prod: Product) => {
    if (!isActiveFavorites) {
      setFavouriteList(favouriteList ? [...favouriteList, prod] : [prod]);
    } else {
      setFavouriteList(
        favouriteList ? favouriteList.filter(item => item.id !== prod.id) : [],
      );
    }
  };

  return (
    <div className="button">
      <button
        className={classNames('button__add', {
          'button__add--active': isActiveCard,
          'button__add--large': isBigCard,
        })}
        onClick={() => {
          if (isActiveCard) {
            removeFromCart(product);
          } else {
            addToCart(product);
          }
        }}
      >
        {isActiveCard ? t('cardButton.0') : t('cardButton.1')}
      </button>
      <button
        className={classNames('button__favourite ', {
          'button__favourite--large': isBigCard,
          'button__favourite--active': isActiveFavorites,
        })}
        onClick={() => addToFavourites(product)}
      >
        <div
          className={classNames('button__img ', {
            'button__img--active': isActiveFavorites,
          })}
        ></div>
      </button>
    </div>
  );
};
