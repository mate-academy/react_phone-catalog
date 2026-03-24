import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
  turnon: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, turnon }) => {
  const { cart, favorites, toggleCart, toggleFavorite } =
    useContext(ProductsContext);
  const { t } = useTranslation();

  const location = useLocation();

  const isProductPage = location.pathname.split('/').length > 2;

  const handleClick = () => {
    if (isProductPage) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const getCategory = () => {
    if (product.category.includes('phones')) {
      return 'phones';
    }

    if (product.category.includes('tablets')) {
      return 'tablets';
    }

    return 'accessories';
  };

  const category = getCategory();

  return (
    <article className={styles.card}>
      <Link
        to={`/${category}/${product.itemId}`}
        className={styles.linkOverlay}
        onClick={handleClick}
      />
      <div className={styles.container}>
        <Link
          to={`/${category}/${product.itemId}`}
          className={styles.linkstyle}
        >
          <img
            src={`./${product.image}`}
            alt={product.name}
            className={styles.image}
          />
        </Link>

        <h3 className={styles.title}>{product.name}</h3>
        <div className={styles.pricebox}>
          <p className={styles.price}>${product.price}</p>
          {turnon && <p className={styles.fullPrice}>${product.fullPrice}</p>}
        </div>

        <div className={styles.line}></div>

        <ul className={styles.specs}>
          <li>
            <span className={styles.lefttext}>{t('screen')}</span>
            <span className={styles.righttext}>{product.screen}</span>
          </li>
          <li>
            <span className={styles.lefttext}>{t('capacity')}</span>
            <span className={styles.righttext}>{product.capacity}</span>
          </li>
          <li>
            <span className={styles.lefttext}>{t('ram')}</span>
            <span className={styles.righttext}>{product.ram}</span>
          </li>
        </ul>

        <div className={styles.actions}>
          <button
            className={
              cart.some(item => item.id === product.itemId)
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={e => {
              e.stopPropagation();
              toggleCart(product.itemId);
              handleClick();
            }}
          >
            <p
              className={
                cart.some(item => item.id === product.itemId)
                  ? `${styles.buttontext} ${styles.activetext}`
                  : styles.buttontext
              }
            >
              {!cart.some(item => item.id === product.itemId) && t('button')}
              {cart.some(item => item.id === product.itemId) && t('buttonadd')}
            </p>
          </button>
          <button
            className={styles.icon}
            onClick={e => {
              e.stopPropagation();
              toggleFavorite(product.itemId, turnon);
            }}
          >
            {!favorites.some(item => item.id === product.itemId) && (
              <img src="./img/icons/heart.svg" alt="Heart" />
            )}

            {favorites.some(item => item.id === product.itemId) && (
              <img src="./img/icons/heartactive.svg" alt="HeartActive" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
