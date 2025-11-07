import React from 'react';
import { Products } from 'src/types/products';
import style from './card.module.scss';
import { Button } from '@GlobalComponents';
import { Link, useLocation, useParams } from 'react-router-dom';

type Props = {
  item: Products;
  title: string;
};

export const Card: React.FC<Props> = ({ item, title }) => {
  const { pathname } = useLocation();
  // const { productId } = useParams();

  return (
    <>
      <article className={style.article}>
        <div className={`${style.wrapper} ${style.card}`}>
          <div className={style.card__header}>
            <Link
              className={style.card__link}
              to={`${pathname}/${item.itemId}`}
            >
              <img className={style.card__img} src={item.image} alt="" />
            </Link>
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
          <div className={style.card__bottom}>
            <Button />
          </div>
        </div>
      </article>
    </>
  );
};
