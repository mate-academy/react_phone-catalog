import React from 'react';
import classNames from 'classnames';
import styles from './PaginationItems.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  totalPages: number;
  currentPage: number;
};

export const PaginationItems: React.FC<Props> = ({
  totalPages,
  currentPage,
}) => {
  const [searchParams] = useSearchParams();
  const windowSize = 4;
  const start = Math.max(0, Math.min(currentPage - 2, totalPages - windowSize));
  const end = Math.min(totalPages, start + windowSize);

  return (
    <ul className={styles.pagination}>
      <li
        className={classNames(
          styles['pagination__item-btn'],
          styles['pagination__item-btn--prev'],
          {
            [styles['pagination__item-btn--disabled']]: currentPage === 1,
          },
        )}
      >
        <Link
          className={styles['pagination__link-arrows']}
          to={{
            search: getSearchWith(searchParams, {
              page: currentPage - 1 === 1 ? null : String(currentPage - 1),
            }).toString(),
          }}
        >
          <img
            className={styles.pagination__img}
            src={
              currentPage === 1
                ? './img/icons/arrow-left-disabled.svg'
                : './img/icons/arrow-left.svg'
            }
            alt="Arrow left"
          />
        </Link>
      </li>
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .slice(start, end)
        .map(elem => (
          <li
            className={classNames(styles.pagination__item, {
              [styles['pagination__item--active']]: elem === currentPage,
            })}
            key={elem}
          >
            <Link
              className={styles.pagination__link}
              to={{
                search: getSearchWith(searchParams, {
                  page: elem === 1 ? null : elem.toString(),
                }).toString(),
              }}
            >
              {elem}
            </Link>
          </li>
        ))}
      <li
        className={classNames(
          styles['pagination__item-btn'],
          styles['pagination__item-btn--next'],
          {
            [styles['pagination__item-btn--disabled']]:
              currentPage === totalPages,
          },
        )}
      >
        <Link
          className={styles['pagination__link-arrows']}
          to={{
            search: getSearchWith(searchParams, {
              page: String(currentPage + 1),
            }).toString(),
          }}
        >
          <img
            className={styles.pagination__img}
            src={
              currentPage === totalPages
                ? './img/icons/arrow-right-disabled.svg'
                : './img/icons/arrow-right.svg'
            }
            alt="Arrow right"
          />
        </Link>
      </li>
    </ul>
  );
};
