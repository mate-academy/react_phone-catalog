import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { Select } from '@shared/components/Select';
import { DefaultProps } from '@shared/types/common';

import styles from './ProductsFilters.module.scss';
import { useProductsFilters } from './useProductsFilters';
import { ITEMS_ON_PAGE_CONFIG, SORT_BY_CONFIG } from '../../utils/filters';

interface ProductsFiltersProps extends DefaultProps {
  isLoading: boolean;
}

export const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  className,
  isLoading,
  ...rest
}) => {
  const { defaultItemsOnPageOption, defaultSortByOption, onChange } =
    useProductsFilters();

  return (
    <Box className={cn(styles.container, className)} {...rest}>
      <Select
        options={SORT_BY_CONFIG}
        label="Sort by"
        defaultOption={defaultSortByOption}
        className={styles.sortBy}
        isDisabled={isLoading}
        onChange={option => onChange(option, 'sort_by')}
      />

      <Select
        options={ITEMS_ON_PAGE_CONFIG}
        defaultOption={defaultItemsOnPageOption}
        label="Items on page"
        className={styles.itemsOnPage}
        isDisabled={isLoading}
        onChange={option => onChange(option, 'items_on_page')}
      />
    </Box>
  );
};
