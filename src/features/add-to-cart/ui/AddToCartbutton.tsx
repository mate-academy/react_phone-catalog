import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { ROUTES } from '@/app/router';

import { selectAddItem, selectIsInCart, useCartStore } from '@/entities/cart';

import { TextButton } from '@/components/molecules';

import { animateProductToHeader } from '@/shared/lib/animateProductToHeader';

import styles from './AddToCartbutton.module.scss';

type Props = {
  productId: number;
  className?: string;
};

export const AddToCartButton = ({ productId, className }: Props) => {
  const { t } = useTranslation();

  const addItem = useCartStore(selectAddItem);
  const isAdded = useCartStore(selectIsInCart(productId));
  const location = useLocation();

  const handleAddToCart = () => {
    animateProductToHeader(productId, 'cart');
    addItem(productId);
  };

  return (
    <TextButton
      className={classNames(styles.button, className)}
      selected={isAdded}
      onClick={isAdded ? () => {} : handleAddToCart}
    >
      {isAdded ?
        <Link
          to={ROUTES.CART}
          state={{ from: `${location.pathname}${location.search}` }}
        >
          {t('addedToCart')}
        </Link>
      : t('addToCart')}
    </TextButton>
  );
};
