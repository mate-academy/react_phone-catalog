import { Product } from '@/shared/type';
import React, { useMemo } from 'react';

import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
// import { ButtonHeart } from '../ButtonHeart/ButtonHeart';
import { ButtonBuy } from '../ButtonBuy/ButtonBuy';
import { useCart } from '@/app/providers/Cart';
import { Link } from 'react-router-dom';
import { useFavourites } from '@/app/providers/Favorities';
import { ButtonHeart } from '../ButtonHeart/ButtonHeart';
import { Skeleton } from 'boneyard-js/react';

type Props = React.ComponentProps<'article'> & {
  product?: Product | undefined;
};
export const ProductCard = ({ product, ...props }: Props) => {
  const { t } = useTranslation();
  const { favourites, setFavourites } = useFavourites();
  const preparedProduct = useMemo(() => {
    return product
      ? product
      : {
          id: 2,
          category: 'phones',
          itemId: 'apple-iphone-7-plus-32gb-black',
          name: 'Apple iPhone 7 Plus 32GB Black',
          fullPrice: 540,
          price: 500,
          screen: "5.5' IPS",
          capacity: '32GB',
          color: 'black',
          ram: '3GB',
          year: 2016,
          image: 'img/phones/apple-iphone-7-plus/black/00.webp',
        };
  }, [product]);

  const { cart, setCart } = useCart();

  const isFavourite = useMemo(
    () => favourites.includes(preparedProduct.itemId),
    [favourites, preparedProduct.itemId],
  );
  const isInCart = useMemo(
    () => cart.includes(preparedProduct.itemId),
    [cart, preparedProduct.itemId],
  );

  return (
    <article {...props} className={styles.main} aria-label={preparedProduct.name}>
      <Skeleton
        name="blog-card"
        loading={!product}
        color="var(--text)"
        darkColor="var(--text )"
        animate="shimmer"
        className={styles.skeleton}
      >
        <div className={styles.content}>
          <Link className={styles.image} to={'phones/' + preparedProduct.itemId}>
            <img
              className={styles.image}
              src={preparedProduct.image}
              alt={preparedProduct.name + ' image'}
              loading="lazy"
            />
          </Link>
          <Link className={styles.titleLink} to={'phones/' + preparedProduct.itemId}>
            <h4 className={styles.title}>{preparedProduct.name}</h4>
          </Link>
          <div className={styles.priceBox}>
            <h3 className={styles.price}>{'$' + preparedProduct.fullPrice}</h3>
            <h3 className={styles.price + ' ' + styles.pricelineThrough}>
              {'$' + preparedProduct.price}
            </h3>
          </div>

          <div className={styles.line}></div>
          <div className={styles.details}>
            <div className={styles.detail}>
              <p className={styles.detailText1}>{t('productCart.screen')}</p>
              <p className={styles.detailText2}>{preparedProduct.screen}</p>
            </div>
            <div className={styles.detail}>
              <p className={styles.detailText1}>{t('productCart.capacity')}</p>
              <p className={styles.detailText2}>{preparedProduct.capacity}</p>
            </div>
            <div className={styles.detail}>
              <p className={styles.detailText1}>{t('productCart.RAM')}</p>
              <p className={styles.detailText2}>{preparedProduct.ram}</p>
            </div>
          </div>
          <div className={styles.buttons}>
            <ButtonBuy
              className={styles.buttonBuy}
              selected={isInCart}
              onClick={() => {
                setCart((prev) =>
                  prev.includes(String(preparedProduct.itemId))
                    ? prev.filter((id) => id !== String(preparedProduct.itemId))
                    : [...prev, String(preparedProduct.itemId)],
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
                  prev.includes(String(preparedProduct.itemId))
                    ? prev.filter((id) => id !== String(preparedProduct.itemId))
                    : [...prev, String(preparedProduct.itemId)],
                );
              }}
            ></ButtonHeart>
          </div>
        </div>
      </Skeleton>
    </article>
  );
};
