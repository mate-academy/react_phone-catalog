import React from 'react';
import styles from './ProductCard.module.scss';
import { ProductImg } from '../../../../shared/components/ProductImg';
import { ProductTitle } from '../../../../shared/components/ProductTitle/ProductTitle';
import { ProductPrices } from '../../../../shared/components/ProductPrices';
import { ProductDescriptionType } from '../../../../shared/types/ProductDescriptionType';
import { ProductDescription } from '../../../../shared/components/ProductDescription';
import { ProductAction } from '../../../../shared/components/ProductAction';

interface Props {
  image: string;
  name: string;
  price: number;
  fullPrice?: number;
  descriptions: Omit<ProductDescriptionType, 'year' | 'color'>;
  className?: string;
  category: string;
  itemId: string;

  toBag: boolean;
  toFavourite: boolean;

  onPrimaryButton: () => void;
  onFavoriteButton: () => void;
}

export const ProductCard: React.FC<Props> = ({
  image,
  name,
  price,
  fullPrice,
  descriptions,
  className,
  toBag,
  toFavourite,
  category,
  itemId,
  onPrimaryButton,
  onFavoriteButton,
}) => {
  return (
    <article className={`${styles.card} ${className}`}>
      <div className={styles.container}>
        <ProductImg image={image} name={name} to={`/${category}/${itemId}`} />

        <ProductTitle name={name} to={`/${category}/${itemId}`} />

        <ProductPrices price={price} fullPrice={fullPrice} />

        <div className={styles.divider} />

        <ProductDescription descriptions={descriptions} />

        <ProductAction
          toBag={toBag}
          toFavourite={toFavourite}
          onAddToCart={onPrimaryButton}
          onAddToFavourite={onFavoriteButton}
        />
      </div>
    </article>
  );
};
