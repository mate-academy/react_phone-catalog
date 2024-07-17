import classNames from 'classnames';
import { Button } from '../Button/Button';
import style from './ProductCard.module.scss';
import { FavouritesButton } from '../FavouritesButton/FavouritesButton';

export const ProductCard = () => {
  const techValueClassName = classNames(
    'text-small',
    style.productCard__techValue,
  );

  return (
    <div className={style.productCard}>
      <img
        className={style.productCard__img}
        src="../../../public/img/phones/apple-iphone-13-pro-max/gold/00.webp"
        alt="product"
      />
      <p className="text-body">Apple iPhone Xs 64GB Silver (iMT9G2FS/A)</p>
      <div className={style.productCard__priceWrapper}>
        <h3>$799</h3>
        <h3 className={style.productCard__fullPrice}>$899</h3>
      </div>

      <div className={style.productCard__divider}></div>

      <div className={style.productCard__information}>
        <div className={style.productCard__info}>
          <p className="text-small">Screen</p>
          <p className={techValueClassName}>5.8” OLED</p>
        </div>
        <div className={style.productCard__info}>
          <p className="text-small">Capacity</p>
          <p className={techValueClassName}>64 GB</p>
        </div>
        <div className={style.productCard__info}>
          <p className="text-small">RAM</p>
          <p className={techValueClassName}>64 GB</p>
        </div>
      </div>
      <div className={style.productCard__btns}>
        <Button text="Add to cart" />
        <FavouritesButton />
      </div>
    </div>
  );
};
