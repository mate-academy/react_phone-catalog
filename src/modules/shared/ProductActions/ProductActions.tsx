import styles from './ProductActions.module.scss';

import { useTranslation } from 'react-i18next';

import Button from '../Button';
import Icon from '../Icon';
import { useCallback, useContext } from 'react';
import { DispatchContext, StateContext } from '../../../store';
import React from 'react';

interface InnerProps {
  isFavorite: boolean;
  onToggle: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  productId: number;
  additionalStyles: string;
}

const ProductActionsInner = React.memo(function ProductActionsInner({
  isFavorite,
  onToggle,
  onAddToCart,
  productId,
  additionalStyles,
}: InnerProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.buttons + ' ' + additionalStyles}>
      <Button
        handleClick={() => onAddToCart(productId)}
        text={t('product-card.add_to_cart')}
      />
      <Icon
        onClick={() => onToggle(productId)}
        iconStyles={{
          icon: 'border',
          image: isFavorite ? 'favorites_active' : 'favorites',
        }}
      />
    </div>
  );
});

interface Props {
  productId: number;
  additionalStyles?: string;
}

const ProductActions: React.FC<Props> = ({
  productId,
  additionalStyles = '',
}) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isFavorite = state.favorites.has(productId);

  const toggle = useCallback(
    (id: number) => {
      dispatch({ type: 'toggleFavorite', payload: id });
    },
    [dispatch],
  );

  const addToCart = useCallback(
    (id: number) => {
      dispatch({ type: 'addToCart', payload: id });
    },
    [dispatch],
  );

  return (
    <ProductActionsInner
      isFavorite={isFavorite}
      onToggle={toggle}
      onAddToCart={addToCart}
      productId={productId}
      additionalStyles={additionalStyles}
    />
  );
};

export default ProductActions;
