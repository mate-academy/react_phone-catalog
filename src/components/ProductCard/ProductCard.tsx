import { Phone } from '@/shared/type';
import React, { useMemo } from 'react';

import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
// import { ButtonHeart } from '../ButtonHeart/ButtonHeart';
import { ButtonBuy } from '../ButtonBuy/ButtonBuy';
import { useCart } from '@/app/providers/Cart';
import { Link } from 'react-router-dom';
import { useFavourites } from '@/app/providers/Favorities';
import { ButtonHeart } from '../ButtonSecond copy/ButtonHeart';

type Props = React.ComponentProps<'article'> & {
  phone: Phone;
};
export const ProductCard = ({ phone, ...props }: Props) => {
  const { t } = useTranslation();
  const { favourites, setFavourites } = useFavourites();

  const { cart, setCart } = useCart();

  const isFavourite = useMemo(() => favourites.includes(phone.id), [favourites, phone.id]);
  const isInCart = useMemo(() => cart.includes(phone.id), [cart, phone.id]);

  return (
    <article {...props} className={styles.main} aria-label={phone.name}>
      <div className={styles.content}>
        <Link to={'phones/' + phone.id}>
          <img
            className={styles.image}
            src={phone.images[0]}
            alt={phone.name + ' image'}
            loading="lazy"
          />
        </Link>
        <Link to={'phones/' + phone.id}>
          <h4 className={styles.title}>{phone.name}</h4>
        </Link>
        <h3 className={styles.price}>{'$' + phone.priceRegular}</h3>
        <div className={styles.line}></div>
        <div className={styles.details}>
          <div className={styles.detail}>
            <p className={styles.detailText1}>{t('productCart.screen')}</p>
            <p className={styles.detailText2}>{phone.screen}</p>
          </div>
          <div className={styles.detail}>
            <p className={styles.detailText1}>{t('productCart.capacity')}</p>
            <p className={styles.detailText2}>{phone.capacity}</p>
          </div>
          <div className={styles.detail}>
            <p className={styles.detailText1}>{t('productCart.RAM')}</p>
            <p className={styles.detailText2}>{phone.ram}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <ButtonBuy
            className={styles.buttonBuy}
            selected={isInCart}
            onClick={() => {
              setCart((prev) =>
                prev.includes(String(phone.id))
                  ? prev.filter((id) => id !== String(phone.id))
                  : [...prev, String(phone.id)],
              );
            }}
          >
            {isInCart ? t('productCart.buttonSelected') : t('productCart.button')}
          </ButtonBuy>
          <ButtonHeart
            className={styles.buttonHeart}
            like={isFavourite}
            onClick={() => {
              setFavourites((prev) =>
                prev.includes(String(phone.id))
                  ? prev.filter((id) => id !== String(phone.id))
                  : [...prev, String(phone.id)],
              );
            }}
          ></ButtonHeart>
        </div>
      </div>
    </article>
  );
};
