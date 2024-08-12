import { Icon } from '../ui/Icon';
import styles from './CartItem.module.scss';
import { CardButton } from '../ui/CardButton';
import classNames from 'classnames';

import img from '../../assets/img/phones/apple-iphone-11/black/00.webp';

export const CartItem = () => {
  return (
    <div className={styles['cart-item']}>
      <div className={styles['cart-item__block']}>
        <CardButton variant="control" style={{ border: 'none' }}>
          <Icon iconName="close" />
        </CardButton>

        <a href="#" className={styles['cart-item__img-link']}>
          <img src={img} className={styles['cart-item__img']} alt="item" />
        </a>

        <a href="#" className={styles['cart-item__title-link']}>
          <p className={classNames('body-text', styles['cart-item__title'])}>
            Apple iPhone 14 Pro 128GB Silver (MQ023)
          </p>
        </a>
      </div>

      <div className={styles['cart-item__block']}>
        <div className={styles['cart-item__control-buttons']}>
          <CardButton variant="control">
            <Icon iconName="minus" />
          </CardButton>
          <p className="body-text">1</p>
          <CardButton variant="control">
            <Icon iconName="plus" />
          </CardButton>
        </div>

        <h4 className={styles['cart-item__price']}>$999</h4>
      </div>
    </div>
  );
};
