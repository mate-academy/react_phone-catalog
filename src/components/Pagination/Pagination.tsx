import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import arrowLeft from '../../images/icons/arrow_left.svg';
import arrowLeftDis from '../../images/icons/arrow_left_dis.png';
import arrowRight from '../../images/icons/arrow_right.svg';
import arrowRightDis from '../../images/icons/arrow_right_dis.png';
import { handleClickToTop } from '../../helpers/scrollToTop';

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

  const MAX_VISIBLE_PAGES = 6;

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
          className={styles.pagination__button}
          onClick={prevPage}
          disabled={disabledLeft}
        >
          <img
            src={disabledLeft ? arrowLeftDis : arrowLeft}
            alt="arrow"
            className={styles.pagination__img}
          />
        </button>

        {visiblePages.map(item => (
          <button
            key={item}
            className={cn(styles.pagination__button, styles.pagination__item, {
              [styles['pagination__item--active']]: page === item,
            })}
            onClick={() => changePage(item)}
          >
            {item}
          </button>
        ))}

        <button
          className={styles.pagination__button}
          onClick={nextPage}
          disabled={disabledRight}
        >
          <img
            src={disabledRight ? arrowRightDis : arrowRight}
            alt="arrow"
            className={styles.pagination__img}
          />
        </button>
      </div>
    </section>
  );
};
