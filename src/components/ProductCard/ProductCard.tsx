import style from './ProductCard.module.scss';
import categoryIphone from '../../assets/img/category-phones.webp';
import like from '../../assets/img/icons/like.svg';

export const ProductCard = () => (
  <div className={style.productCard__container}>
    <article className={style.card}>
      <img src={categoryIphone} className={style.card__img} />
      <div className={style.card__title}>
        Apple iPhone 14 Pro 128GB Silver (MQ023)
      </div>
      <div className={style.card__price}>$999</div>
      <div className={style.card__divider} />
      <div className={style.card__specs}>
        <div className={style.card__specs__item}>
          <div className={style.card__specs__key}>Screen</div>
          <div className={style.card__specs__value}>6.1” OLED</div>
        </div>
        <div className={style.card__specs__item}>
          <div className={style.card__specs__key}>Capacity</div>
          <div className={style.card__specs__value}>128 GB</div>
        </div>
        <div className={style.card__specs__item}>
          <div className={style.card__specs__key}>RAM</div>
          <div className={style.card__specs__value}>6 GB</div>
        </div>
      </div>
      <div className={style.card__bottom}>
        <button className={style.card__button}>Add to cart</button>
        <img src={like} className={style.card__like} />
      </div>
    </article>
  </div>
);
