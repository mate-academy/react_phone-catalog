import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import styles from './Pagination.module.scss';
import { getNumbers } from '../../../services/getNumbers';

type Props = {
  currentPage: number;
  split: number;
  total: number;
};

export const Pagination: React.FC<Props> = ({ currentPage, split, total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const countTabs = Math.ceil(total / split);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === countTabs;

  const getVisibleButtons = () => {
    const maxVisibleButtons = 5;

    if (countTabs <= maxVisibleButtons) {
      return getNumbers(1, countTabs);
    }

    const buttons: any[] = [1];

    if (currentPage > 3) {
      buttons.push('...');
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(currentPage + 1, countTabs - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    if (currentPage < countTabs - 2) {
      buttons.push('...');
    }

    buttons.push(countTabs);

    return buttons;
  };

  const buttons = getVisibleButtons();

  return (
    <>
      <div className={`page__pagination ${styles.pagination}`}>
        <div className={styles.pagination__container}>
          <button
            className={cn(
              `${styles.pagination__nav} ${styles['pagination__nav--prev']}`,
              {
                [styles.disabled]: isPrevDisabled,
              },
            )}
            onClick={() => {
              searchParams.set('page', `${currentPage - 1}`);
              setSearchParams(searchParams);
            }}
            disabled={isPrevDisabled}
          >
            <img src="./img/icons/arrow-left.svg" alt="<" />
          </button>

          <div className={styles.pagination__pages}>
            {buttons.map((num, index) => (
              <button
                onClick={() => {
                  if (typeof num === 'number') {
                    searchParams.set('page', `${num}`);
                    setSearchParams(searchParams);
                  }
                }}
                key={index}
                className={cn(styles.pagination__page, {
                  [styles.selected]: currentPage === num,
                  [styles.pagination__dots]: num === '...',
                })}
                disabled={num === '...'}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            className={cn(
              `${styles.pagination__nav} ${styles['pagination__nav--next']}`,
              {
                [styles.disabled]: isNextDisabled,
              },
            )}
            onClick={() => {
              searchParams.set('page', `${currentPage + 1}`);
              setSearchParams(searchParams);
            }}
            disabled={isNextDisabled}
          >
            <img src="./img/icons/arrow-right.svg" alt=">" />
          </button>
        </div>
      </div>
    </>
  );
};
