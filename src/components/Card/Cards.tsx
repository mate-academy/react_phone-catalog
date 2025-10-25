import React from 'react';
import { Products } from 'src/types/products';
import style from './card.module.scss';

type Props = {
  item: Products;
};

export const Card: React.FC<Props> = ({ item }) => {
  return (
    <article className={style.article}>
      <div className={style.wrapper}>
        <div className={style.card__header}>
          <a className={style.card__link} href="#">
            <img className={style.card__img} src={item.image} alt="" />
          </a>
        </div>
        <div className={style.card__info}></div>
        <div className={style.card__bottom}></div>
      </div>
    </article>
  );
};
