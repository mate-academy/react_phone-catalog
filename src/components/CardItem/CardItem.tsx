import style from './CardItem.module.scss';

const title = 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)';

export const CardItem = () => {
  return (
    <article className={style.cardItem}>
      <div className={style.cardItem__product}>
        <div className={style.cardItem__product__closeButton}>x</div>
        <img className={style.cardItem__product__image} />
        <h2 className={style.cardItem__product__title}>{title}</h2>
      </div>
      <section className={style.cardItem__info}>
        <div className={style.cardItem__info__pickAmount}>
          <div className={style.cardItem__info__pickAmount__button}>-</div>
          <div className={style.cardItem__info__pickAmount__amount}>1</div>
          <div className={style.cardItem__info__pickAmount__button}>+</div>
        </div>
        <span className={style.cardItem__info__price}>$1099</span>
      </section>
    </article>
  );
};
