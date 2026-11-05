import { useTranslation } from 'react-i18next';

import { Breadcrumbs, ProductCard } from '@/components/organisms';
import { Typography } from '@/components/atoms';

import type { ProductRating } from '@/entities/product/api/product-ratings.api';

import type { Product } from '@/shared/types';

import styles from './FavouritesTemplate.module.scss';

type Props = {
  data: Product[];
  ratingsMap: Map<string, ProductRating>;
  count: number;
  isLoading: boolean;
};

export const FavouritesTemplate = ({
  data,
  ratingsMap,
  count,
  isLoading,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[{ label: t('favorites') }]}
        className={styles.breadcrumbs}
      />

      <div className={styles.header}>
        <Typography
          variant="h1"
          className={styles.title}
        >
          {t('favorites')}
        </Typography>

        <Typography
          variant="bodytext"
          className={styles.count}
        >
          {t('itemsCount', { count })}
        </Typography>
      </div>

      <div className={styles.grid}>
        {isLoading ?
          Array.from({ length: count }, (_, index) => (
            <ProductCard
              isLoading
              key={`skeleton-${index}`}
              className={styles.item}
            />
          ))
        : data.map((item) => (
            <ProductCard
              product={item}
              rating={ratingsMap.get(item.namespace_id)}
              key={item.id}
              className={styles.item}
            />
          ))
        }
      </div>
    </div>
  );
};
