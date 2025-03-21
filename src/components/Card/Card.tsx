import { Product } from '../../types/Product';
import s from './Card.module.scss';
import { Link } from 'react-router-dom';
import { AddTo } from '../AddTo';
import { useEffect, useState } from 'react';
import { wait } from '../../httpClient';

type Props = {
  product: Product;
  isHot?: boolean;
};

export const Card: React.FC<Props> = ({ product, isHot }) => {
  const {
    image,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const setSkeleton = async () => {
      setIsLoading(true);
      await wait();
      await wait();
      setIsLoading(false);
    };

    setSkeleton();
  }, []);

  if (isLoading) {
    return (
      <article className={`${s.Card} ${s.Card__loading}`}>
        <div className={s.Card__content}>
          <div className={`${s.skeleton} ${s.Card__imgSkeleton}`}></div>
          <div className={`${s.skeleton} ${s.Card__nameSkeleton}`}></div>
          <div className={`${s.skeleton} ${s.Card__priceSkeleton}`}></div>
          <div className={s.Card__line}></div>
          <div className={s.Card__info}>
            <div className={s.Card__block}>
              <div className={`${s.skeleton} ${s.Card__propSkeleton}`}></div>
              <div className={`${s.skeleton} ${s.Card__valueSkeleton}`}></div>
            </div>
            <div className={s.Card__block}>
              <div className={`${s.skeleton} ${s.Card__propSkeleton}`}></div>
              <div className={`${s.skeleton} ${s.Card__valueSkeleton}`}></div>
            </div>
            <div className={s.Card__block}>
              <div className={`${s.skeleton} ${s.Card__propSkeleton}`}></div>
              <div className={`${s.skeleton} ${s.Card__valueSkeleton}`}></div>
            </div>
          </div>
          <div className={s.Card__buttons}>
            <div className={`${s.skeleton} ${s.Card__buttonSkeleton}`}></div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={s.Card}>
      <div className={s.Card__content}>
        <Link to={`/${category}/${itemId}`} className={s.Card__link}>
          <img
            src={`/${image}`}
            alt={`${itemId}-photo`}
            className={s.Card__img}
          />
        </Link>
        <p className={s.Card__phoneName}>{name}</p>
        <h3 className={s.Card__price}>
          {`$${isHot ? price : fullPrice}`}
          {isHot && <span className={s.Card__fullPrice}>${fullPrice}</span>}
        </h3>

        <div className={s.Card__line}></div>
        <div className={s.Card__info}>
          <div className={s.Card__block}>
            <p className={s.Card__prop}>Screen</p>
            <p className={s.Card__value}>{screen}</p>
          </div>
          <div className={s.Card__block}>
            <p className={s.Card__prop}>Capacity</p>
            <p className={s.Card__value}>{capacity}</p>
          </div>
          <div className={s.Card__block}>
            <p className={s.Card__prop}>RAM</p>
            <p className={s.Card__value}>{ram}</p>
          </div>
        </div>
        <div className={s.Card__buttons}>
          <AddTo product={product} />
        </div>
      </div>
    </article>
  );
};
