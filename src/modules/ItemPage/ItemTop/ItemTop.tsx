import React from 'react';
import styles from './ItemTop.module.scss';

import { ItemGallery } from './ItemGallery/ItemGallery';
import { ItemInfo } from './ItemInfo/ItemInfo';
import { ProductDetails } from '../../../types/ProductDetails';
import { Product } from '../../../types/Product';

type Props = {
  product: ProductDetails;
  normalized: Product;
  isInCart: boolean;
  isFavorite: boolean;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
  onAddToCart: () => void;
  onToggleFavorite: () => void;
};

export const ItemTop: React.FC<Props> = ({
  product,
  normalized,
  isInCart,
  isFavorite,
  onColorChange,
  onCapacityChange,
  onAddToCart,
  onToggleFavorite,
}) => {
  return (
    <div className={styles.itemTop}>
      <ItemGallery images={product.images} />

      <ItemInfo
        product={product}
        normalized={normalized}
        isInCart={isInCart}
        isFavorite={isFavorite}
        onColorChange={onColorChange}
        onCapacityChange={onCapacityChange}
        onAddToCart={onAddToCart}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};
