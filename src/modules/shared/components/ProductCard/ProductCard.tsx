/* eslint-disable max-len */
import { Link, useLocation } from 'react-router-dom';
import { ProductData } from '../../types/ProductData';
import styles from './ProductCard.module.scss';
import { AddToCartButton } from '../Buttons/AddToCartButton/AddToCartButton';
import { FavoritesButton } from '../Buttons/FavoritesButton/FavoritesButton';

type Props = {
  productsArray: ProductData[];
};

export const ProductCard: React.FC<Props> = ({ productsArray }) => {
  const { pathname } = useLocation();

  const itemPath = (prod: ProductData) => {
    if (pathname !== prod.category) {
      return `/${prod.category}/${prod.itemId}`;
    } else {
      return `${prod.itemId}`;
    }
  };

  return (
    <>
      {productsArray &&
        productsArray.map(product => {
          return (
            <article key={product.id} className={styles.card}>
              <div className={styles.card__body}>
                <Link to={{ pathname: itemPath(product) }} className={styles.card__link}>
                  <img src={`./${product.image}`} className={styles.card__image} />

                  <div className={styles.card__title}>{product.name}</div>
                </Link>

                <div className={styles.card__price}>
                  <div className={styles.card__current}>${product.price}</div>
                  <div className={styles.card__full}>${product.fullPrice}</div>
                </div>

                <span className={styles.card__line}></span>

                <div className={styles.card__description}>
                  <div className={styles.card__param}>Screen</div>
                  <div className={styles.card__info}>{product.screen}</div>
                </div>
                <div className={styles.card__description}>
                  <div className={styles.card__param}>Capacity</div>
                  <div className={styles.card__info}>{product.capacity}</div>
                </div>
                <div className={styles.card__description}>
                  <div className={styles.card__param}>RAM</div>
                  <div className={styles.card__info}>{product.ram}</div>
                </div>

                <div className={styles.card__buttons}>
                  <AddToCartButton product={product} />
                  <FavoritesButton product={product} />
                </div>
              </div>
            </article>
          );
        })}
    </>
  );
};
