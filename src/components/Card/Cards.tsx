import React, { useContext } from 'react';
import { Products } from 'src/types/products';
import { Device } from 'src/types/Device';
import style from './card.module.scss';
import { Button } from '@GlobalComponents';
import { Link } from 'react-router-dom';
import { ShoppingContex } from '../../context/ShoppingContex';

import 'react-toastify/dist/ReactToastify.css';

import { findISelectedItem } from '../../utils/findSelectedItem';
import { showNotify } from '../../utils/showNotify';

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

  const { toggleFavorite, favoritItems, cartItems, increaseToCart } =
    useContext(ShoppingContex);

  const selected = findISelectedItem(cartItems, item.name);
  const favorit = findISelectedItem(favoritItems, item.name);

  const notifyAddedToCart = (newItem: Items) => {
    return showNotify(`${newItem.name} added to cart!`, 'dark');
  };

  const notifyAddedFavorit = (newItem: Items) => {
    if (!favorit) {
      return showNotify(`${newItem.name} Added to favorites!`, 'dark');
    } else {
      return showNotify(`${newItem.name} Removed from favorites!`);
    }
  };

  return (
    <>
      <article className={style.article}>
        <div className={`${style.wrapper} ${style.card}`}>
          <Link to={`/${item.category}/${product.id}`}>
            <div className={style.card__header}>
              <div className={style.card__link}>
                <img className={style.card__img} src={product.img} alt="" />
              </div>
            </div>

            <div className={style.card__body}>
              <h3 className={style.card__title}>{item.name}</h3>
              <div className={style.price}>
                <p className={style.card__price}>${product.price}</p>
                {title === 'Hot prices' && (
                  <p className={style.card__discount}>${product.fullPrice}</p>
                )}
              </div>
              <div className={style.line}></div>
              <dl className={style.card__info}>
                <div className={style['card__info-row']}>
                  <dt>Screen</dt>
                  <dd>{item.screen}</dd>
                </div>
                <div className={style['card__info-row']}>
                  <dt>Сapacity</dt>
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
              toggleFavorite={() => toggleFavorite(item)}
              notifyAddedCart={() => notifyAddedToCart(item)}
              increaseToCart={() => increaseToCart(item)}
              notifyAddedFavorit={() => notifyAddedFavorit(item)}
            />
          </div>
        </div>
      </article>
    </>
  );
};
