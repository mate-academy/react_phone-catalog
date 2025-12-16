//#region React / Core

import React, { useContext } from 'react';
//endregion

//#region Types

import { Products } from 'src/types/products';
import { Device } from 'src/types/Device';
//endregion

//#region Styles

import style from './card.module.scss';
//endregion

//#region Global Components

import { Button } from '@GlobalComponents';
//endregion

//#region Router

import { Link } from 'react-router-dom';
//endregion

//#region Context

import { ShoppingContex } from '../../context/ShoppingContex';
//endregion

//#region Global Styles

import 'react-toastify/dist/ReactToastify.css';
//endregion

//#region Utils

import { findISelectedItem } from '../../utils/findSelectedItem';
import { showNotify } from '../../utils/showNotify';
//endregion

//#region i18n

import { useTranslation } from 'react-i18next';
//endregion

type Items = Products | Device;

type Props = {
  item: Items;
  title: string;
  type?: string;
};

const normalizeItem = (item: Items) => {
  if ('itemId' in item) {
    return {
      id: item.itemId,
      img: item.image,
      price: item.price,
      fullPrice: item.fullPrice,
    };
  }

  return {
    id: item.id,
    img: item.images[0],
    price: item.priceDiscount,
    fullPrice: item.priceRegular,
  };
};

export const Card: React.FC<Props> = ({ item, title }) => {
  const product = normalizeItem(item);
  const { t } = useTranslation();

  const { toggleFavorite, favoritItems, cartItems, toggleItems } =
    useContext(ShoppingContex);

  const selected = findISelectedItem(cartItems, item.name);
  const favorit = findISelectedItem(favoritItems, item.name);

  const notifyAddedToCart = (newItem: Items) => {
    if (!selected) {
      return showNotify(
        t('notifications.addedToCart', { name: newItem.name }),
        'dark',
      );
    } else {
      return showNotify(
        t('notifications.removeToCart', { name: newItem.name }),
      );
    }
  };

  const notifyAddedFavorit = (newItem: Items) => {
    if (!favorit) {
      return showNotify(
        t('notifications.addedToFavorites', { name: newItem.name }),
        'dark',
      );
    } else {
      return showNotify(
        t('notifications.removedFromFavorites', { name: newItem.name }),
      );
    }
  };

  return (
    <>
      <article className={style.article}>
        <div className={`${style.wrapper} ${style.card}`}>
          <Link
            onClick={() => {
              window.scrollTo({
                top: 0,
              });
            }}
            to={`/${item.category}/${product.id}`}
          >
            <div className={style.card__header}>
              <div className={style.card__link}>
                <img className={style.card__img} src={product.img} alt="" />
              </div>
            </div>

            <div className={style.card__body}>
              <h3 className={style.card__title}>{item.name}</h3>
              <div className={style.price}>
                <p className={style.card__price}>${product.price}</p>
                {title === t('carusel.hotPrice') && (
                  <p className={style.card__discount}>${product.fullPrice}</p>
                )}
              </div>
              <div className={style.line}></div>
              <dl className={style.card__info}>
                <div className={style['card__info-row']}>
                  <dt>{t('product.screen')}</dt>
                  <dd>{item.screen}</dd>
                </div>
                <div className={style['card__info-row']}>
                  <dt>{t('product.capacity')}</dt>
                  <dd>{item.capacity}</dd>
                </div>
                <div className={style['card__info-row']}>
                  <dt>RAM</dt>
                  <dd>{item.ram}</dd>
                </div>
              </dl>
            </div>
          </Link>
          <div className={style.card__bottom}>
            <Button
              isAdded={!!selected}
              isFavorit={!!favorit}
              toggleItems={() => toggleItems(item)}
              toggleFavorite={() => toggleFavorite(item)}
              notifyAddedCart={() => notifyAddedToCart(item)}
              notifyAddedFavorit={() => notifyAddedFavorit(item)}
            />
          </div>
        </div>
      </article>
    </>
  );
};
