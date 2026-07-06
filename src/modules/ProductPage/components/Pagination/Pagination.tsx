//#region imports
import cn from 'classnames';
import { SliderButton } from '../../../shared/components/SliderButton';
import { useTranslation } from 'react-i18next';
import styles from './Pagination.module.scss';
import { useMemo } from 'react';
import { getPageNumbers } from './services/getPageNumbers';
//#endregion

type Props = {
  total: number;
  page: number;
  perPage: number;
  onPageChange: (newPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  page,
  perPage,
  onPageChange,
}) => {
  const { t } = useTranslation('productPage');
  const pageQuantity = Math.ceil(total / perPage);

  const pages = useMemo(
    () => getPageNumbers(page, pageQuantity),
    [page, pageQuantity],
  );

  return (
    <nav className={styles.pagination} aria-label={t('pagination')}>
      <SliderButton
        direction="left"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        ariaLabel={t('previousPage')}
      />

      <ul className={styles.pageButtons}>
        {pages.map((number, i) => {
          const pageNumber = +number;

          return isNaN(pageNumber) ? (
            <li key={`dots-${i}`}>
              <span aria-hidden="true">...</span>
            </li>
          ) : (
            <li key={pageNumber}>
              <button
                className={cn(styles.pageButton, {
                  [styles.selected]: page === pageNumber,
                })}
                onClick={() => onPageChange(pageNumber)}
                aria-label={`${t('page')} ${pageNumber}`}
                aria-current={page === pageNumber ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ul>

      <SliderButton
        direction="right"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageQuantity}
        ariaLabel={t('nextPage')}
      />
    </nav>
  );
};
