import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CartEmpty.module.scss';
import CART_EMPTY from '/img/cart/cart-is-empty.webp';

export const CartEmpty: FC = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.cartEmpty}>
      <figure className={styles.wrapper}>
        <img src={CART_EMPTY} alt={t('cart.empty.alt')} loading="lazy" />
        <figcaption className={styles.caption}>
          {t('cart.empty.title')}😥
          <br />
          <span>
            {t('cart.empty.sub')} <b>{t('cart.empty.happy')}</b>
          </span>
        </figcaption>
      </figure>
    </section>
  );
};
