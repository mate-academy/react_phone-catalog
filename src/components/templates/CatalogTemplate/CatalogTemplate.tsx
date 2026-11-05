import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Breadcrumbs,
  CatalogFilter,
  CatalogPagination,
  ProductCard,
} from '@/components/organisms';
import { Typography } from '@/components/atoms';

import { useProductRatings } from '@/entities/product/model/product-ratings.queries';

import type { CatalogTemplateData } from './CatalogTemplate.types';

import styles from './CatalogTemplate.module.scss';

type Props = {
  data: CatalogTemplateData;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const CatalogTemplate = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const { data: ratings = [] } = useProductRatings();

  const ratingsMap = useMemo(
    () => new Map(ratings.map((item) => [item.namespaceId, item])),
    [ratings],
  );

  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[{ label: t(data.title) }]}
        className={styles.breadcrumbs}
      />

      <h1 className={styles.title}>
        {data.title === 'phones' ? t('mobilePhones') : t(data.title)}
      </h1>

      <Typography
        className={styles.modelsCount}
        variant="bodytext"
      >
        {t('modelsCount', { count: data.totalItems })}
      </Typography>

      <CatalogFilter />

      <div className={styles.content}>
        {data.isLoading ?
          Array.from({ length: 8 }, (_, index) => (
            <ProductCard
              className={styles.card}
              key={`skeleton-${index}`}
              isLoading
            />
          ))
        : data.items.map((item) => (
            <ProductCard
              className={styles.card}
              product={item}
              rating={ratingsMap.get(item.namespace_id)}
              key={item.id}
            />
          ))
        }
      </div>

      <CatalogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className={styles.pagination}
      />
    </div>
  );
};
