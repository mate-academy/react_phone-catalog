import classNames from 'classnames/bind';

import { WishlistButton } from '../Ui/WishlistButton';
import { Button } from '../Ui/Button/Button';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

export const ProductCard = () => {
  return (
    <div className={cx('product-card')}>
      <div className={cx('product-card__image-box')}>
        <img
          className={cx('product-card__image')}
          src="public/img/phones/apple-iphone-xs/gold/00.webp"
          alt=""
        />
      </div>
      <div className={cx('product-card__title')}>
        Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
      </div>
      <div className={cx('product-card__prices')}>
        <div className={cx('product-card__price')}>$799</div>
        <div className={cx('product-card__old-price')}>$899</div>
      </div>
      <hr className={cx('product-card__divider')} />
      <div className={cx('product-card__descriptions')}>
        <div className={cx('product-card__description')}>
          <p className={cx('product-card__label')}>Screen</p>
          <p className={cx('product-card__vale')}>5.8” OLED</p>
        </div>
        <div className={cx('product-card__description')}>
          <p className={cx('product-card__label')}>Screen</p>
          <p className={cx('product-card__vale')}>5.8” OLED</p>
        </div>
        <div className={cx('product-card__description')}>
          <p className={cx('product-card__label')}>Screen</p>
          <p className={cx('product-card__vale')}>5.8” OLED</p>
        </div>
      </div>
      <div className={cx('product-card__buttons')}>
        <Button onClick={() => {}} textAfterClick={'Added'}>
          Add to cart
        </Button>
        <WishlistButton selected={false} onClick={() => {}} />
      </div>
    </div>
  );
};
