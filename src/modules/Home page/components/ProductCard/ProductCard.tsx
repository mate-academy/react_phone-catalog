import React from 'react';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../../context/CartContext';
import { useFavourites } from '../../../../context/FavouritesContext';
import classNames from 'classnames';
import { Product } from '../../../../types/product';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
  discount: boolean;
  isSlider?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  discount,
  isSlider,
}) => {
  const { t } = useTranslation();
  const [isAnimated, setIsAnimated] = React.useState<boolean>(false);
  const { items, dispatch } = React.useContext(CartContext);
  const { isFavourite, toggleFavourite } = useFavourites();
  const isInCart = items.some(item => item.product.id === product.id);

  const handleAddToFavourites = (product1: Product) => {
    toggleFavourite(product1);
    setIsAnimated(true);

    setTimeout(() => {
      setIsAnimated(false);
    }, 300);
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const { category, name, fullPrice, price, screen, capacity, ram, image } =
    product;

  return (
    <div
      className={classNames(styles.ProductCard, {
        [styles.ProductCard__slider]: isSlider, // Apply slider-specific styles
        [styles.ProductCard__catalog]: !isSlider, // Apply catalog-specific styles
      })}
    >
      <div className={styles.ProductCard__image}>
        <Link
          to={`/${category}/${product.itemId}`}
          className={styles.ProductCard__link}
        >
          <img src={`./${image}`} alt={name} />
        </Link>
      </div>
      <div className={styles.ProductCard__info}>
        <Link
          to={`/${category}/${product.itemId}`}
          className={styles.ProductCard__link}
        >
          <h3 className={styles.ProductCard__title}> {name} </h3>
        </Link>
        {!discount ? (
          <p className={styles.ProductCard__price}> {`$${fullPrice}`} </p>
        ) : (
          <div className={styles.ProductCard__price}>
            <p className={styles.ProductCard__price_discount}>{`$${price}`}</p>
            <p className={styles.ProductCard__price_full}>
              {' '}
              {`$${fullPrice}`}{' '}
            </p>
          </div>
        )}
      </div>
      <div className={styles.ProductCard__details}>
        <ul className={styles.ProductCard__details_list}>
          <li className={styles.ProductCard__details_item}>
            <span className={styles.ProductCard__details_item_name}>
              {t('productDetails.screen')}
            </span>
            <span className={styles.ProductCard__details_item_value}>
              {screen}
            </span>
          </li>
          <li className={styles.ProductCard__details_item}>
            <span className={styles.ProductCard__details_item_name}>
              {t('productDetails.cardCapacity')}
            </span>
            <span className={styles.ProductCard__details_item_value}>
              {capacity}
            </span>
          </li>
          <li className={styles.ProductCard__details_item}>
            <span className={styles.ProductCard__details_item_name}>
              {t('productDetails.ram')}
            </span>
            <span className={styles.ProductCard__details_item_value}>
              {ram}
            </span>
          </li>
        </ul>
      </div>

      <div className={styles.ProductCard__footer}>
        <button
          className={classNames(styles.ProductCard__button, {
            [styles['ProductCard__button--added']]: isInCart,
          })}
          onClick={() => handleAddToCart()}
        >
          {isInCart ? t('card.added') : t('card.add_to_cart')}
        </button>
        <div
          className={classNames(styles.ProductCard__favourite, {
            [styles['ProductCard__favourite--animated']]: isAnimated,
          })}
          onClick={() => handleAddToFavourites(product)}
        >
          <img
            src={
              isFavourite(product.id)
                ? './img/buttons/Icons/Buttons/Icons/Favourites Filled (Heart Like).svg'
                : './img/Favourites (Heart Like).svg'
            }
            alt="like"
            className={styles.ProductCard__imageLike}
          />
        </div>
      </div>
    </div>
  );
};
