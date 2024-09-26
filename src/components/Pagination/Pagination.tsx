import React from 'react';
import styles from './Pagination.module.scss';
import { ArrowButton } from '../ArrowButton';
import { ArrowType } from '../../utils/types';
import classNames from 'classnames';

type Props = {
  pagesAmount: number;
  searchParams: URLSearchParams;
  setSearchParams: (value: URLSearchParams) => void;
  activePage: string;
};

export const Pagination: React.FC<Props> = ({
  pagesAmount,
  searchParams,
  setSearchParams,
  activePage,
}) => {
  const pagesAmountArray = Array.from(
    { length: pagesAmount },
    (_, index) => index + 1,
  );

  const handlePageSelect = (number: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(number));
    setSearchParams(params);
  };

  const handleNextClick = () => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(+activePage + 1));
    setSearchParams(params);
  };

  const handlePrevClick = () => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(+activePage - 1));
    setSearchParams(params);
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__buttons}>
        <div className={styles.pagination__left}>
          <ArrowButton
            type={ArrowType.left}
            onClick={handlePrevClick}
            disabled={+activePage === 1}
          />
        </div>
        <div className={styles.pagination__numbers}>
          {pagesAmountArray.map((pageNumber: number) => {
            return (
              <button
                key={pageNumber}
                className={classNames(styles.pagination__button, {
                  [styles['pagination__button--active']]:
                    pageNumber === +activePage,
                })}
                onClick={() => handlePageSelect(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
        <div className={styles.pagination__right}>
          <ArrowButton
            type={ArrowType.right}
            onClick={handleNextClick}
            disabled={+activePage === pagesAmount}
          />
        </div>
      </div>
    </div>
  );
};
