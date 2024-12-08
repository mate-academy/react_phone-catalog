import { useMemo } from 'react';

import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { BreadCrumbs } from '@shared/components/BreadCrumbs';
import { Skeleton } from '@shared/components/Skeleton';
import { DefaultProps } from '@shared/types/common';
import { ProductCategory } from '@shared/types/Product/Product.interfaces';

import styles from './ProductsHeader.module.scss';
import { ProductsFilters } from '../ProductsFilters';

export interface ProductsHeaderProps extends DefaultProps {
  category: ProductCategory;
  title: string;
  total?: number;
  isLoading: boolean;
}

export const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  category,
  title,
  total,
  className,
  isLoading,
  ...rest
}) => {
  const breadCrumbs = useMemo(
    () => [
      {
        id: category,
        href: `/products/?category=${category}`,
        title: `${category[0].toUpperCase()}${category.slice(1, category.length)}`,
      },
    ],
    [category],
  );

  return (
    <Box variant="section" className={cn(styles.header, className)} {...rest}>
      <BreadCrumbs breadCrumbs={breadCrumbs} className={styles.breadCrumbs} />

      <Text variant="h1" className={styles.title}>
        {title}
      </Text>

      {isLoading ? (
        <Skeleton width={70} height={21} />
      ) : (
        <Text variant="body" className={styles.subtitle}>
          {total} models
        </Text>
      )}

      <Box className={styles.filters}>
        <ProductsFilters isLoading={isLoading} />
      </Box>
    </Box>
  );
};
