import React, { useEffect, useRef } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './pagination.module.scss';
import classNames from 'classnames';

export const Pagination: React.FC = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  onResetPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pegaParam = searchParams.get('page');

  const page = pegaParam === null ? 1 : Number(pegaParam);

  const handleLinkParams = (link: number) => {
    const currentParams = new URLSearchParams(searchParams);

    if (link === 1) {
      currentParams.delete('page');
    } else {
      currentParams.set('page', link.toString());
    }

    const queryString = currentParams.toString();

    return queryString ? `?${queryString}` : '';
  };

  const getNumbers = (from: number, to: number) => {
    const numbers = [];

    for (let n = from; n <= to; n++) {
      numbers.push(n);
    }

    return numbers;
  };

  const sliderRef = useRef<HTMLUListElement>(null);

  const pagesCount = Math.ceil(total / perPage);
  const pagesLink = getNumbers(1, pagesCount);

  const isFirstPage = page === 1;
  const isLastPage = page === pagesCount;
  const maxVisible = 4;

  const prevPageLink = isFirstPage ? '' : handleLinkParams(currentPage - 1);
  const nextPageLink = isLastPage ? '' : handleLinkParams(currentPage + 1);

  useEffect(() => {
    if (sliderRef.current) {
      const targetIndex = page - maxVisible;
      const sliderWidth = sliderRef.current.children[0]?.clientWidth || 0;
      const offSet = targetIndex * (sliderWidth + 8);

      if (page < maxVisible) {
        sliderRef.current.style.transform = `translateX(${0}px)`;
      } else {
        sliderRef.current.style.transform = `translateX(-${offSet}px)`;
      }
    }
  }, [page]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (perPage) {
      onResetPage(1);

      const newParams = new URLSearchParams(searchParams);

      params.delete('page');
      setSearchParams(newParams, { replace: true });
    }
  }, [perPage]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <>
      <div className={styles.pagination}>
        <div className={styles['page-item']}>
          <NavLink
            onClick={event => {
              if (isFirstPage) {
                event.preventDefault();
              } else {
                onPageChange(currentPage - 1);
              }
            }}
            className={`${styles['page-buttom']} ${styles['page-buttom--left']}`}
            to={currentPage - 1 !== 1 ? prevPageLink : ''}
          >
            <img
              className={styles['page-buttom-image-left']}
              src="/img/arrow.png"
              alt=""
            />
          </NavLink>
        </div>
        <div className={styles['pagination-wrapper']}>
          <ul className={styles['pagination-list']} ref={sliderRef}>
            {pagesLink.map(link => (
              <li
                key={link}
                className={`${styles['page-item']} ${styles['page-item--carrousel']}`}
              >
                <NavLink
                  onClick={() => onPageChange(link)}
                  className={classNames(styles['page-link'], {
                    [styles['page-link--active']]: link === page,
                  })}
                  to={handleLinkParams(link)}
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['page-item']}>
          <NavLink
            onClick={event => {
              if (isLastPage) {
                event.preventDefault();
              } else {
                onPageChange(currentPage + 1);
              }
            }}
            className={styles['page-buttom']}
            to={nextPageLink}
          >
            <img src="/img/arrow.png" alt="" />
          </NavLink>
        </div>
      </div>
    </>
  );
};
