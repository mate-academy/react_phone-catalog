import styles from './ProductActions.module.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../Button';
import Icon from '../Icon';
import { useCallback } from 'react';
import { ProductCatalogItem } from '../../../types/ProductCatalogItem';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { favoritesActions } from '../../../store/index';
import { itemsActions } from '../../../store/index';
interface InnerProps {
  isFavorite: boolean;
  isItemAdded: boolean;
  onToggle: (productId: number) => void;
  onAddToCart: (product: ProductCatalogItem) => void;
  product: ProductCatalogItem;
  additionalStyles: string;
}

const ProductActionsInner = React.memo(function ProductActionsInner({
  isFavorite,
  isItemAdded,
  onToggle,
  onAddToCart,
  product,
  additionalStyles,
}: InnerProps) {
  const { t } = useTranslation();
  const text = isItemAdded
    ? t('product-card.item_added')
    : t('product-card.add_to_cart');
  const handleClick = () => onAddToCart(product);

  return (
    <div className={styles.buttons + ' ' + additionalStyles}>
      <Button handleClick={handleClick} text={text} isSelected={isItemAdded} />
      <Icon
        onClick={() => onToggle(product.id)}
        iconStyles={{
          icon: isFavorite ? 'type_add__selected' : 'type_add',
          image: isFavorite ? 'favorites_active' : 'favorites',
        }}
      />
    </div>
  );
});

interface Props {
  product: ProductCatalogItem;
  additionalStyles?: string;
}

const ProductActions: React.FC<Props> = ({
  product,
  additionalStyles = '',
}) => {
  const favorites = useAppSelector(state => state.favorites);
  const items = useAppSelector(state => state.items);
  const dispatch = useAppDispatch();

  const isFavorite = !!favorites[product.id];
  const isItemAdded = !!items[product.id];

  const toggle = useCallback(
    () => dispatch(favoritesActions.toggle(product)),
    [dispatch, product],
  );

  const addToCart = useCallback(
    () => isItemAdded || dispatch(itemsActions.add(product)),
    [isItemAdded, dispatch, product],
  );

  return (
    <ProductActionsInner
      isFavorite={isFavorite}
      isItemAdded={isItemAdded}
      onToggle={toggle}
      onAddToCart={addToCart}
      product={product}
      additionalStyles={additionalStyles}
    />
  );
};

export default ProductActions;
