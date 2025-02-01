/* eslint-disable max-len */
import styles from './ProductCart.module.scss';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { CartBtnType } from '../../../../types/CartBtnType';
import { CartProduct } from '../../../../types/Context';
import { hasDiscount } from '../../../../utils/hasDiscount';
import { useTranslation } from 'react-i18next';

interface Props {
  cartProduct: CartProduct;
  handleCart: (cartBtnType: CartBtnType, productId: string) => void;
}

export const ProductCart: React.FC<Props> = ({
  cartProduct: { id, quantity, product },
  handleCart,
}) => {
  const { t } = useTranslation('common');
  const { state } = useLocation();
  const { category, images, name, priceDiscount, priceRegular } = product;
  const withDiscount = hasDiscount(name);
  const price = withDiscount ? priceDiscount : priceRegular;

  return (
    <article className={styles.cartProductContainer}>
      <div className={styles.topWrapper}>
        <button
          onClick={() => handleCart(CartBtnType.delete, id)}
          className={styles.btnClose}
          aria-label={t('accessibility.removeProduct')}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894 12.4716 3.52859C12.2112 3.26824 11.7891 3.26824 11.5288 3.52859L8.00016 7.05719L4.47157 3.52859C4.21122 3.26824 3.78911 3.26824 3.52876 3.52859C3.26841 3.78894 3.26841 4.21105 3.52876 4.4714L7.05735 7.99999L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.9428L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99999L12.4716 4.4714Z" />
          </svg>
        </button>
        <Link
          to={`/${category}/${id}`}
          state={state}
          className={styles.productContainer}
        >
          <div className={styles.imgContainer}>
            <img src={images[0]} alt={name} />
          </div>
          <p className={styles.productName}>{name}</p>
        </Link>
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.counterContainer}>
          <button
            className={styles.btnCounter}
            onClick={() => handleCart(CartBtnType.subtract, id)}
            disabled={quantity <= 1}
            aria-label={t('accessibility.deleteOne')}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.6665 7.99999C2.6665 7.63181 2.96498 7.33333 3.33317 7.33333H12.6665C13.0347 7.33333 13.3332 7.63181 13.3332 7.99999C13.3332 8.36818 13.0347 8.66666 12.6665 8.66666H3.33317C2.96498 8.66666 2.6665 8.36818 2.6665 7.99999Z" />
            </svg>
          </button>
          <span className={styles.textCounter}>{quantity}</span>
          <button
            className={styles.btnCounter}
            onClick={() => handleCart(CartBtnType.add, id)}
            aria-label={t('accessibility.addOne')}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.6665 3.33334C8.6665 2.96515 8.36803 2.66667 7.99984 2.66667C7.63165 2.66667 7.33317 2.96515 7.33317 3.33334V7.33334H3.33317C2.96498 7.33334 2.6665 7.63182 2.6665 8.00001C2.6665 8.3682 2.96498 8.66667 3.33317 8.66667H7.33317V12.6667C7.33317 13.0349 7.63165 13.3333 7.99984 13.3333C8.36803 13.3333 8.6665 13.0349 8.6665 12.6667V8.66667H12.6665C13.0347 8.66667 13.3332 8.3682 13.3332 8.00001C13.3332 7.63182 13.0347 7.33334 12.6665 7.33334H8.6665V3.33334Z" />
            </svg>
          </button>
        </div>
        <span className={styles.priceForProduct}>{'$' + quantity * price}</span>
      </div>
    </article>
  );
};
