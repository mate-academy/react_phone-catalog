import React, { useContext } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import arrowLeft from '../../images/icons/arrow_left.svg';
import arrowLeftLight from '../../images/icons/arrow_left_for_dark.svg';
import arrowLeftDis from '../../images/icons/arrow_left_dis.png';
import arrowRight from '../../images/icons/arrow_right.svg';
import arrowRightLight from '../../images/icons/arrow_right_for_dark.svg';
import arrowRightDis from '../../images/icons/arrow_right_dis.png';
import { handleClickToTop } from '../../helpers/scrollToTop';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';

type Props = {
  countPages: number[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  countPages,
  page,
  setPage = () => {},
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useContext(ThemeContext);

  const MAX_VISIBLE_PAGES = 5;

  const startPage = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
  const endPage = Math.min(
    countPages.length,
    startPage + MAX_VISIBLE_PAGES - 1,
  );

  const visiblePages = countPages.slice(startPage - 1, endPage);

  const prevPage = () => {
    setPage(prev => prev - 1);
  };

  const nextPage = () => {
    setPage(prev => prev + 1);
  };

  const changePage = (newPage: number) => {
    setPage(newPage);

    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.set('page', newPage.toString());
    setSearchParams(updatedParams);

    handleClickToTop();
  };

  const disabledLeft = page === 1;
  const disabledRight = page === countPages.length;

  return (
    <section className={styles.pagination}>
      <div className={styles.pagination__container}>
        <button
          className={cn({
            [styles.pagination__button]: theme === Theme.Light,
            [styles['pagination__button--dark']]: theme === Theme.Dark,
          })}
          onClick={prevPage}
          disabled={disabledLeft}
        >
          <img
            src={
              disabledLeft
                ? arrowLeftDis
                : theme === Theme.Dark
                  ? arrowLeftLight
                  : arrowLeft
            }
            alt="arrow"
            className={styles.pagination__img}
          />
        </button>

        {visiblePages.map(item => (
          <button
            key={item}
            className={cn(styles.pagination__button, {
              [styles.pagination__item]: theme === Theme.Light,
              [styles['pagination__item--dark']]: theme === Theme.Dark,
              [styles['pagination__item--active']]: page === item,
              [styles['pagination__item--dark--active']]:
                page === item && theme === Theme.Dark,
            })}
            onClick={() => changePage(item)}
          >
            {item}
          </button>
        ))}

        <button
          className={cn({
            [styles.pagination__button]: theme === Theme.Light,
            [styles['pagination__button--dark']]: theme === Theme.Dark,
          })}
          onClick={nextPage}
          disabled={disabledRight}
        >
          <img
            src={
              disabledRight
                ? arrowRightDis
                : theme === Theme.Dark
                  ? arrowRightLight
                  : arrowRight
            }
            alt="arrow"
            className={styles.pagination__img}
          />
        </button>
      </div>
    </section>
  );
};
