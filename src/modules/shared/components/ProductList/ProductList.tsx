import React from 'react';
import styles from './ProductList.module.scss';
import { ProductCard } from '../ProductCard';
import { ProductType } from '../../../../shared/types/ProductType';
import { useFavorite } from '../../../../hooks/context/useFavorite';
import { useCart } from '../../../../hooks/context/useCart';
import { createArray } from '../../utils/createArray';
import { ProductCardSkeleton } from '../../../../shared/UI/Skeletons/ProductCardSkeleton';
import { useTranslation } from 'react-i18next';

interface Props {
  items: ProductType[];
  loading?: boolean;
  category?: string;
}

export const ProductList: React.FC<Props> = ({ items, loading, category }) => {
  const { t } = useTranslation();
  const { toogleProductFromFavourite, haveItemInFavourite } = useFavorite();
  const { toogleProductFromBag, haveItemInBag } = useCart();

  if (!loading && items.length === 0 && category) {
    return (
      <p className={styles.errorMessage}>
        {t('catalog_pages.search.error_message.message', {
          value: t(`catalog_pages.search.error_message.${category}`),
        })}
      </p>
    );
  }

  return (
    <div className={styles.list}>
      {loading
        ? createArray(16).map((_, i) => <ProductCardSkeleton key={i} />)
        : items.map(product => (
            <ProductCard
              key={product.id}
              image={product.image}
              price={product.price}
              fullPrice={product.fullPrice}
              name={product.name}
              descriptions={{
                capacity: product.capacity,
                screen: product.screen,
                ram: product.ram,
              }}
              category={product.category}
              itemId={product.itemId}
              toBag={haveItemInBag(product.itemId)}
              toFavourite={haveItemInFavourite(product.itemId)}
              onFavoriteButton={() =>
                toogleProductFromFavourite(product.itemId)
              }
              onPrimaryButton={() => toogleProductFromBag(product.itemId)}
            />
          ))}
    </div>
  );
};
