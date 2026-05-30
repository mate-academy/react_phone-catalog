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
  // #region functions
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

  const pagesAmountSlicedArray = (
    pageIsActive: number,
    pagesToSlice: number,
  ) => {
    const activeIndex = pagesAmountArray.indexOf(pageIsActive);
    const sliced = pagesAmountArray.slice(
      activeIndex,
      activeIndex + pagesToSlice + 1,
    );

    return sliced;
  };
  // #endregion

  // #region vars

  const slicedArray = pagesAmountSlicedArray(+activePage, 2);

  // #endregion

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
          {
            pagesAmount <= 5 ? (
              pagesAmountArray.map((pageNumber: number) => (
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
              ))
            ) : (
              /* eslint-disable @typescript-eslint/indent */
              <>
                {slicedArray[slicedArray.length - 1] === pagesAmount ||
                slicedArray[slicedArray.length - 1] + 1 === pagesAmount ? (
                  pagesAmountArray.slice(-5).map((pageNumber: number) => (
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
                  ))
                ) : (
                  <>
                    {slicedArray.map((pageNumber: number) => (
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
                    ))}

                    <button className={styles.pagination__button} disabled>
                      ...
                    </button>

                    <button
                      key={pagesAmount}
                      className={classNames(styles.pagination__button, {
                        [styles['pagination__button--active']]:
                          pagesAmount === +activePage,
                      })}
                      onClick={() => handlePageSelect(pagesAmount)}
                    >
                      {pagesAmount}
                    </button>
                  </>
                )}
              </>
            )
            /* eslint-enable @typescript-eslint/indent */
          }
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
