import React from 'react';
import { Product } from '../../types/Product';
import useCartStore from '../../stores/useCartStore';
import useFavoritesStore from '../../stores/useFavoritesStore';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import useLanguageStore from '../../stores/useLanguageStore';
import { translateDynamicValue } from '../../utils/constants';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { t, currentLanguage } = useLanguageStore();
  const navigate = useNavigate();
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;

  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const { addToCart, isAddedToCart } = useCartStore();

  // Використання компонента Link для навігації
  const linkPath = `/${category}/${itemId}`;

  // Використання хука useNavigate для програмної навігації
  const handleViewDetailsClick = () => {
    navigate(linkPath);
  };

  return (
    <div className={styles['product-card']} onClick={handleViewDetailsClick}>
      <div className={styles['product-card__image-container']}>
        <img className={styles['product-card__image']} src={image} alt={name} />
      </div>

      <div className={styles['product-card__main-info']}>
        <p className={styles['product-card__title']}>
          {translateDynamicValue(name, currentLanguage)}
        </p>

        <div className={styles['product-card__prices']}>
          <p className={styles['product-card__price--current']}>${price}</p>

          {fullPrice && (
            <span className={styles['product-card__price--full']}>
              ${fullPrice}
            </span>
          )}
        </div>

        <div className={styles['product-card__divider']}></div>

        <div className={styles['product-card__specs']}>
          <div className={styles['product-card__specs-item']}>
            <span className={styles['product-card__specs-name']}>
              {t('card_screen')}:
            </span>

            <span className={styles['product-card__specs-value']}>
              {translateDynamicValue(screen || '', currentLanguage)}
            </span>
          </div>

          <div className={styles['product-card__specs-item']}>
            <span className={styles['product-card__specs-name']}>
              {t('card_capacity')}:
            </span>

            <span className={styles['product-card__specs-value']}>
              {translateDynamicValue(capacity || '', currentLanguage)}
            </span>
          </div>

          <div className={styles['product-card__specs-item']}>
            <span className={styles['product-card__specs-name']}>
              {t('card_ram')}:
            </span>

            <span className={styles['product-card__specs-value']}>
              {translateDynamicValue(ram || '', currentLanguage)}
            </span>
          </div>
        </div>

        <div className={styles['product-card__actions']}>
          <button
            className={classNames(styles['product-card__btn--cart'], {
              'is-danger': isAddedToCart(product.id),
              'is-success': !isAddedToCart(product.id),
            })}
            onClick={event => {
              event.stopPropagation();
              addToCart(product);
            }}
          >
            {t('add_to_cart')}
          </button>

          <button
            className={styles['product-card__btn--favourites']}
            onClick={event => {
              event.stopPropagation();

              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              isFavorite(product.id)
                ? removeFavorite(product.id)
                : addFavorite(product);
            }}
          >
            <span className={styles.icon}>
              <i
                className={classNames({
                  'fas fa-heart': isFavorite(product.id), // Якщо улюблений, використовуємо заповнене серце (solid)
                  'far fa-heart': !isFavorite(product.id), // Якщо не улюблений, використовуємо контурне серце (regular)
                  'has-text-danger': isFavorite(product.id), // Додаємо червоний колір для улюбленого
                })}
              ></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
