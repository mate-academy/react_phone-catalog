import React, { useMemo } from 'react';
import styles from './CardItem.module.scss';
import '../../styles/App.scss';
import Price from '../Price';
import { Product } from '../../types/products';
import {
  CardType,
  decreaseCard,
  increaseCard,
  removeFromCard,
} from '../../store/slices/cardsSlice';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type CardItemProps = {
  product: Product;
  card: CardType;
};

const CardItem: React.FC<CardItemProps> = ({ product, card }) => {
  const dispatch = useDispatch();

  function handleCancelItem() {
    dispatch(removeFromCard(product.itemId));
  }

  function handleIncreaseItem() {
    dispatch(increaseCard(product.itemId));
  }

  function handleDecreaseItem() {
    dispatch(decreaseCard(product.itemId));
  }

  const isActive = useMemo(() => {
    return card.cardNumber > 1;
  }, [card.cardNumber]);

  return (
    <div className={styles['card-item']}>
      <div className={styles['card-item__top']}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles['card-item__cancel-icon']}
          onClick={handleCancelItem}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M12.4721 4.47138C12.7324 4.21103 12.7324 3.78892 12.4721 3.52858C12.2117 3.26823 11.7896 3.26823 11.5292 3.52858L8.00065 7.05717L4.47206 3.52858C4.21171 3.26823 3.7896 3.26823 3.52925 3.52858C3.2689 3.78892 3.2689 4.21103 3.52925 4.47138L7.05784 7.99998L3.52925 11.5286C3.2689 11.7889 3.2689 12.211 3.52925 12.4714C3.7896 12.7317 4.21171 12.7317 4.47206 12.4714L8.00065 8.94279L11.5292 12.4714C11.7896 12.7317 12.2117 12.7317 12.4721 12.4714C12.7324 12.211 12.7324 11.7889 12.4721 11.5286L8.94346 7.99998L12.4721 4.47138Z"
            fill="#B4BDC4"
          />
        </svg>
        <div className={styles['card-item__top-links']}>
          <NavLink to={`/${product.category}/${product.itemId}`}>
            {' '}
            <img
              src={`../public/${product.image}`}
              alt="product img"
              className={styles['card-item__prodcut-img']}
            />
          </NavLink>
          <NavLink
            to={`/${product.category}/${product.itemId}`}
            className={styles['card-item__prodcut-name']}
          >
            {product.name}
          </NavLink>
        </div>
      </div>
      <div className={styles['card-item__bottom']}>
        <div className={styles['card-item__counter']}>
          <button
            type="button"
            className={classNames(
              styles['card-item__counter-btn'],
              isActive && styles['card-item__counter-btn--active'],
            )}
            onClick={handleDecreaseItem}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M2.66602 7.99998C2.66602 7.63179 2.96449 7.33331 3.33268 7.33331H12.666C13.0342 7.33331 13.3327 7.63179 13.3327 7.99998C13.3327 8.36817 13.0342 8.66665 12.666 8.66665H3.33268C2.96449 8.66665 2.66602 8.36817 2.66602 7.99998Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <p className={styles['card-item__counter-value']}>
            {card.cardNumber}
          </p>
          <button
            type="button"
            className={`${styles['card-item__counter-btn']} ${styles['card-item__counter-btn--active']}`}
            onClick={handleIncreaseItem}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M8.66602 3.33335C8.66602 2.96516 8.36754 2.66669 7.99935 2.66669C7.63116 2.66669 7.33268 2.96516 7.33268 3.33335V7.33335H3.33268C2.96449 7.33335 2.66602 7.63183 2.66602 8.00002C2.66602 8.36821 2.96449 8.66669 3.33268 8.66669H7.33268V12.6667C7.33268 13.0349 7.63116 13.3334 7.99935 13.3334C8.36754 13.3334 8.66602 13.0349 8.66602 12.6667V8.66669H12.666C13.0342 8.66669 13.3327 8.36821 13.3327 8.00002C13.3327 7.63183 13.0342 7.33335 12.666 7.33335H8.66602V3.33335Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <Price>${card.cardTotalCost}</Price>
      </div>
    </div>
  );
};

export default CardItem;
