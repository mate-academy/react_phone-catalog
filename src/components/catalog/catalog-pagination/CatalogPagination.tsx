import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Arrows } from '@components/home/banner/slider/arrows/Arrows';

import { Icons, Pagination } from '@ui/index';

import { IPagination } from '@utils/types/pagination.interface';

import styles from './CatalogPagination.module.scss';

type TProps = {
  productsLength: number;
  pagination: IPagination;
};

export const CatalogPagination: FC<TProps> = ({
  productsLength,
  pagination,
}) => {
  const {
    isPrevDisabled,
    isNextDisabled,
    itemPerPage,
    currentPage,
    handlePageChange,
    setCurrentPage,
  } = pagination;
  const { t } = useTranslation();
  const handlePrevPage = () => handlePageChange(-1);
  const handleNextPage = () => handlePageChange(1);
  const localPrevious = t('pagination.label.previous');
  const localNext = t('pagination.label.next');

  return (
    <nav className={styles.paginations}>
      <Arrows
        onClick={handlePrevPage}
        label={localPrevious}
        disabled={isPrevDisabled}
      >
        <Icons.ArrowLeftIcon />
      </Arrows>

      <Pagination
        length={productsLength}
        itemPerPage={itemPerPage}
        currentPage={currentPage}
        handlePagination={setCurrentPage}
      />

      <Arrows
        onClick={handleNextPage}
        label={localNext}
        disabled={isNextDisabled}
      >
        <Icons.ArrowRightIcon />
      </Arrows>
    </nav>
  );
};
