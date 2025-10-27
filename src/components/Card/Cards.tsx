import React from 'react';
import { Products } from 'src/types/products';
import style from './card.module.scss';
import { Button } from '@GlobalComponents';

type Props = {
  item: Products;
};

export const Card: React.FC<Props> = ({ item }) => {
  return (
    <article className={style.article}>
      <div className={`${style.wrapper} ${style.card}`}>
        <div className={style.card__header}>
          <a className={style.card__link} href="#">
            <img className={style.card__img} src={item.image} alt="" />
          </a>
        </div>
        <div className={style.card__body}>
          <h3 className={style.card__title}>{item.name}</h3>
          <p className={style.card__price}>${item.price}</p>
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
        <div className={style.card__bottom}>
          <Button />
        </div>
      </div>
    </article>
  );
};
