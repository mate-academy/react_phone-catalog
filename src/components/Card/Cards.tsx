import React, { useContext } from 'react';
import { Products } from 'src/types/products';
import style from './card.module.scss';
import { Button } from '@GlobalComponents';
import { Link } from 'react-router-dom';
import { ShoppingContex } from '../../context/ShoppingContex';

import 'react-toastify/dist/ReactToastify.css';

import { findISelectedItem } from '../../utils/findSelectedItem';
import { showNotify } from '../../utils/showNotify';

type Props = {
  item: Products;
  title: string;
  type?: string;
};

export const Card: React.FC<Props> = ({ item, title }) => {
  const { toggleFavorite, favoritItems, cartItems, increaseToCart } =
    useContext(ShoppingContex);

  const selected = findISelectedItem(cartItems, item.name);
  const favorit = findISelectedItem(favoritItems, item.name);

  const notifyAddedToCart = (newItem: Products) => {
    return showNotify(`${newItem.name} added to cart!`, 'dark');
  };

  const notifyAddedFavorit = (newItem: Products) => {
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
          <Link to={`/${item.category}/${item.itemId}`}>
            <div className={style.card__header}>
              <div className={style.card__link}>
                <img className={style.card__img} src={item.image} alt="" />
              </div>
            </div>

            <div className={style.card__body}>
              <h3 className={style.card__title}>{item.name}</h3>
              <div className={style.price}>
                <p className={style.card__price}>${item.fullPrice}</p>
                {title === 'Hot prices' && (
                  <p className={style.card__discount}>${item.price}</p>
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
