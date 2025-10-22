import React from 'react';
import styles from './MainControls.module.scss';
import { AnyDetailedProduct } from '../../../../types/DetailedProductTypes'; // Ваш об'єднаний тип
import { AvailableColors } from './components/AvailableColors';
import { SelectCapacity } from './components/SelectCapacity/SelectCapacity';
import useFavoritesStore from '../../../../stores/useFavoritesStore';
import useCartStore from '../../../../stores/useCartStore';
import useLanguageStore from '../../../../stores/useLanguageStore';
import classNames from 'classnames';
import { translateDynamicValue } from '../../../../utils/constants';
import { Product } from '../../../../types/Product';

interface ProductOptionsProps {
  product: AnyDetailedProduct;
  shortProduct: Product;
}

export const MainControls: React.FC<ProductOptionsProps> = ({
  product,
  shortProduct,
}) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { addToCart, isAddedToCart } = useCartStore();
  const { t, currentLanguage } = useLanguageStore();
  const {
    priceRegular: fullPrice,
    priceDiscount: price,
    screen,
    resolution,
    processor,
    ram,
  } = product;

  return (
    <div className={styles['main-controls']}>
      <div className={styles['main-controls__options']}>
        <AvailableColors product={product} />

        <SelectCapacity product={product} />
      </div>

      <div className="product-prices-actions__wraper">
        <div className={styles['product__prices']}>
          <p className={styles['product__price--current']}>${price}</p>

          {fullPrice && (
            <span className={styles['product__price--full']}>${fullPrice}</span>
          )}
        </div>

        <div className={styles['product__actions']}>
          <button
            className={classNames(styles['product__btn--cart'], {
              'is-danger': isAddedToCart(product.id),
              'is-success': !isAddedToCart(product.id),
            })}
            onClick={() => addToCart(shortProduct)}
          >
            {t('add_to_cart')}
          </button>

          <button
            className={styles['product__btn--favourites']}
            onClick={() =>
              isFavorite(product.id)
                ? removeFavorite(product.id)
                : addFavorite(shortProduct)
            }
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

      <div className={styles['product-card__specs']}>
        <div className={styles['product-card__specs-item']}>
          <span className={styles['product-card__specs-name']}>
            {t('card_screen')}
          </span>

          <span className={styles['product-card__specs-value']}>
            {translateDynamicValue(screen || '', currentLanguage)}
          </span>
        </div>

        <div className={styles['product-card__specs-item']}>
          <span className={styles['product-card__specs-name']}>
            {t('card_resolution')}
          </span>

          <span className={styles['product-card__specs-value']}>
            {translateDynamicValue(resolution || '', currentLanguage)}
          </span>
        </div>

        <div className={styles['product-card__specs-item']}>
          <span className={styles['product-card__specs-name']}>
            {t('card_processor')}
          </span>

          <span className={styles['product-card__specs-value']}>
            {translateDynamicValue(processor || '', currentLanguage)}
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
    </div>
  );
};
