import { useMemo } from 'react';

import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { BreadCrumbs } from '@shared/components/BreadCrumbs';
import { ProductsCards } from '@shared/components/ProductsCards';
import { Skeleton } from '@shared/components/Skeleton';

import styles from './FavoritesPage.module.scss';
import { useFavorites } from './hooks/useFavorites';

export const FavoritesPage = () => {
  const { favorites, isInitialLoading } = useFavorites();

  const breadCrumbs = useMemo(
    () => [
      {
        id: 'favorites',
        href: `/favorites`,
        title: 'Favorites',
      },
    ],
    [],
  );

  return (
    <Box className={cn('container', styles.container)}>
      <Box className={styles.header}>
        <BreadCrumbs breadCrumbs={breadCrumbs} className={styles.breadCrumbs} />

        <Box className={styles.title}>
          <Text variant="h1">Favorites</Text>

          {isInitialLoading ? (
            <Skeleton width={50} height={21} />
          ) : (
            <Text variant="body" className={styles.subtitle}>
              {favorites?.length ?? 0} items
            </Text>
          )}
        </Box>
      </Box>

      <ProductsCards products={favorites} isLoading={isInitialLoading} />
    </Box>
  );
};
