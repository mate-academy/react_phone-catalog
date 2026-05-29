import { Product } from '@/shared/type';
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
  product: Product;
};
export const ProductCard = ({ product, ...props }: Props) => {
  const { t } = useTranslation();
  const { favourites, setFavourites } = useFavourites();

  const { cart, setCart } = useCart();

  const isFavourite = useMemo(() => favourites.includes(product.itemId), [favourites, product.itemId]);
  const isInCart = useMemo(() => cart.includes(product.itemId), [cart, product.itemId]);

  return (
    <article {...props} className={styles.main} aria-label={product.name}>
      <div className={styles.content}>
        <Link className={styles.image} to={'phones/' + product.itemId}>
          <img
            className={styles.image}
            src={product.image}
            alt={product.name + ' image'}
            loading="lazy"
          />
        </Link>
        <Link className={styles.titleLink} to={'phones/' + product.itemId}>
          <h4 className={styles.title}>{product.name}</h4>
        </Link>
        <div className={styles.priceBox}>
          <h3 className={styles.price}>{'$' + product.fullPrice}</h3>
          <h3 className={styles.price + ' ' + styles.pricelineThrough}>{'$' + product.price}</h3>
        </div>

        <div className={styles.line}></div>
        <div className={styles.details}>
          <div className={styles.detail}>
            <p className={styles.detailText1}>{t('productCart.screen')}</p>
            <p className={styles.detailText2}>{product.screen}</p>
          </div>
          <div className={styles.detail}>
            <p className={styles.detailText1}>{t('productCart.capacity')}</p>
            <p className={styles.detailText2}>{product.capacity}</p>
          </div>
          <div className={styles.detail}>
            <p className={styles.detailText1}>{t('productCart.RAM')}</p>
            <p className={styles.detailText2}>{product.ram}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <ButtonBuy
            className={styles.buttonBuy}
            selected={isInCart}
            onClick={() => {
              setCart((prev) =>
                prev.includes(String(product.id))
                  ? prev.filter((id) => id !== String(product.id))
                  : [...prev, String(product.id)],
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
                prev.includes(String(product.id))
                  ? prev.filter((id) => id !== String(product.id))
                  : [...prev, String(product.id)],
              );
            }}
          ></ButtonHeart>
        </div>
      </div>
    </article>
  );
};
