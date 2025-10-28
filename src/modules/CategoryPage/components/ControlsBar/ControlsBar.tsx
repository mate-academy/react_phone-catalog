import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '../../../shared/components/Dropdown/Dropdown';
import { SortBy } from '../../../../constants/sortOptions';
import styles from './ControlsBar.module.scss';

type Props = {
  sortOptions: { value: SortBy; label: string }[];
  sortBy: SortBy;
  onSortChange: (value: string | number) => void;
  productsPerPageOptions: { value: number; label: string }[];
  productsPerPage: number;
  onPerPageChange: (value: string | number) => void;
  totalProducts: number;
  loading: boolean;
  searchQuery?: string;
};

export const ControlsBar: React.FC<Props> = ({
  sortOptions,
  sortBy,
  onSortChange,
  productsPerPageOptions,
  productsPerPage,
  onPerPageChange,
  totalProducts,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {!loading && (
        <>
          <p className={styles.productCount}>
            {totalProducts} {t('category.models')}
          </p>

          <div className={styles.controls}>
            <div className={styles.filters}>
              <Dropdown
                options={sortOptions}
                value={sortBy}
                onChange={onSortChange}
                placeholder={t('category.sortBy')}
                label={t('category.sortBy')}
                className={styles.sortDropdown}
              />
              <Dropdown
                options={productsPerPageOptions}
                value={productsPerPage}
                onChange={onPerPageChange}
                placeholder={t('category.itemsOnPage')}
                label={t('category.itemsOnPage')}
                className={styles.perPageDropdown}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
