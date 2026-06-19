/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */

//#region IMPORTS
import { useTranslation } from 'react-i18next';

import { Button } from '@/modules/shared/components/ui/Button';

import ArrowLeft from '@/assets/svg/arrow-left.svg?react';
import ArrowRight from '@/assets/svg/arrow-right.svg?react';

import styles from './Pagination.module.scss';
//#endregion

//#region STYLES
const {
  paginationContainer,
  paginationArrow,
  paginationPages,
  paginationEllipsis,
  paginationBtn,
  paginationBtnActive,

  arrowLeft,
  arrowRight
} = styles;
//#endregion

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  //#region HOOKS
  const { t } = useTranslation();
  //#endregion

  //#region LOGIC
  const getVisiblePages = () => {
    // Сторінок мало (5 або менше). Показуємо всі цифри підряд.
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    //  Ми на самому початку (1, 2 або 3 сторінка).
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }

    // Ми в самому кінці.
    if (currentPage >= totalPages - 2) {
      return [
        1,
        '...',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Ми десь посередині (показуємо сторінку до і сторінку після).
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();
  //#endregion

  //#region RENDER
  return (
    <div className={paginationContainer}>
      <Button
        variant="icon"
        className={paginationArrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={t('pagination.aria.previous')}
      >
        <ArrowLeft
          className={arrowLeft}
          aria-label={t('pagination.alt.arrowLeft')}
        />
      </Button>

      <div className={paginationPages}>
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className={paginationEllipsis}>
                ...
              </span>
            );
          }

          return (
            <Button
              variant="icon"
              key={page}
              className={`
                ${paginationBtn}
                ${page === currentPage ? paginationBtnActive : ''}
              `}
              onClick={() => onPageChange(Number(page))}
              aria-label={t('pagination.aria.page', { page })}
            >
              <span>{page}</span>
            </Button>
          );
        })}
      </div>

      <Button
        variant="icon"
        className={paginationArrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={t('pagination.aria.next')}
      >
        <ArrowRight
          className={arrowRight}
          aria-label={t('pagination.alt.arrowRight')}
        />
      </Button>
    </div>
  );
  //#endregion
};
