import classNames from 'classnames';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ButtonArrow } from '../ButtonArrow';
import styles from './Pagination.module.scss';

type Props = {
  itemsAmount: number;
};

export const Pagination = ({ itemsAmount }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || null;

  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount = Math.ceil(itemsAmount / Number(perPage));

  const dynamicPages = () => {
    const pages: number[] = Array.from({ length: pagesCount }, (_, i) => i + 1);

    if (currentPage < 3) {
      return pages.slice(0, 5);
    }

    if (currentPage > pages.length - 3) {
      return pages.slice(-5);
    }

    return pages.slice(currentPage - 3, currentPage + 2);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set('page', currentPage.toString());
    setSearchParams(params);
  }, [currentPage]);

  return (
    <div className={styles.pagination}>
      <ButtonArrow
        direction={'left'}
        onClick={() => {
          setCurrentPage(prev => prev - 1);
        }}
        disabled={currentPage === 1}
      />
      <div className={styles.pages}>
        {dynamicPages().map(item => {
          return (
            <button
              key={item}
              type="button"
              className={classNames(styles.button, {
                [styles.button__active]: currentPage === item,
              })}
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
      <ButtonArrow
        direction={'right'}
        onClick={() => {
          setCurrentPage(prev => prev + 1);
        }}
        disabled={currentPage === pagesCount}
      />
    </div>
  );
};
