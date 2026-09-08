import styles from './AddToCartButton.module.scss';

import React, { useMemo } from 'react';
import classNames from 'classnames';

import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import {
  useUserActions,
  useUserActionsDispatch,
} from '../../context/useUserActions';
import { useProducts } from '../../context/useProducts';

type Props = {
  productData: Product | ProductDetails;
};

export const AddToCartButton: React.FC<Props> = ({ productData }) => {
  const { products } = useProducts();
  const { cart } = useUserActions();
  const dispatch = useUserActionsDispatch();

  const correspondingShortProduct = useMemo(() => {
    if ('namespaceId' in productData) {
      return products.find(p => p.itemId === productData.id);
    }

    return productData;
  }, [products, productData]);

  const isInCart = useMemo(() => {
    if (!correspondingShortProduct) {
      return false;
    }

    return cart.some(
      cartItem => cartItem.product.id === correspondingShortProduct.id,
    );
  }, [cart, correspondingShortProduct]);

  const handleToggleCart = () => {
    if (correspondingShortProduct) {
      dispatch({ type: 'TOGGLE_IN_CART', payload: correspondingShortProduct });
    }
  };

  return (
    <button
      className={classNames(styles.buttonCart, {
        [styles['buttonCart--added']]: isInCart,
        [styles['buttonCart--add']]: !isInCart,
      })}
      onClick={handleToggleCart}
    >
      <div className={styles.buttonCart__textWrapper}>
        <span
          className={classNames(styles.buttonCart__text, {
            [styles['buttonCart__text--visible']]: !isInCart,
          })}
        >
          Add to cart
        </span>
        <span
          className={classNames(styles.buttonCart__text, {
            [styles['buttonCart__text--visible']]: isInCart,
          })}
        >
          Added
        </span>
      </div>
    </button>
  );
};
