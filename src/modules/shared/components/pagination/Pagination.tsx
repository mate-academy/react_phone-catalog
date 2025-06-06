import React, { useEffect, useMemo } from 'react';

import styles from './Pagination.module.scss';
import { AppButton } from '../appButton';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { changeSearchParams } from '../../../../utils/changeSearchParams';
import { ArrowLeftSvg } from '../../svg/ArrowLeftSvg';
import { ArrowRightSvg } from '../../svg/ArrowRightSvg';

type Props = {
  countPages: number;
};

const changePage = (searchParams: URLSearchParams, newPage: number) => {
  const newParams = String(newPage) === '1' ? null : String(newPage);

  return changeSearchParams(searchParams, { page: newParams });
};

export const Pagination: React.FC<Props> = ({ countPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = +(searchParams.get('page') || '1');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [activePage]);

  const buttons = useMemo(() => {
    const result = [];

    if (countPages <= 6) {
      for (let i = 1; i <= countPages; i++) {
        result.push(i);
      }
    } else if (activePage <= 4) {
      result.push(1, 2, 3, 4, 5, '...', countPages);
    } else if (activePage >= countPages - 3) {
      result.push(
        1,
        '...',
        countPages - 4,
        countPages - 3,
        countPages - 2,
        countPages - 1,
        countPages,
      );
    } else {
      result.push(
        1,
        '...',
        activePage - 1,
        activePage,
        activePage + 1,
        activePage + 2,
        '...',
        countPages,
      );
    }

    return result;
  }, [countPages, activePage]);

  const showNextPage = () => {
    setSearchParams(
      changePage(searchParams, Math.min(activePage + 1, countPages)),
    );
  };

  const showPrevPage = () => {
    setSearchParams(changePage(searchParams, Math.max(activePage - 1, 1)));
  };

  return (
    <div className={styles.pagination}>
      <AppButton buttonName="show prev page" onClick={showPrevPage}>
        <ArrowLeftSvg color="var(--active-arrow-svg)" />
      </AppButton>

      <div className={styles.pagesContainer}>
        {buttons.map((b, i) =>
          typeof b === 'string' ? (
            <span key={i + '...'} className={styles.dots}>
              ...
            </span>
          ) : (
            <AppButton
              key={b}
              buttonName={`${b}`}
              className={classNames(styles.buttonPage, {
                [styles.activePage]: b === activePage,
              })}
              onClick={() => setSearchParams(changePage(searchParams, b))}
            />
          ),
        )}
      </div>

      <AppButton buttonName="show next page" onClick={showNextPage}>
        <ArrowRightSvg color="var(--active-arrow-svg)" />
      </AppButton>
    </div>
  );
};
