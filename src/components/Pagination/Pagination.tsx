import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import stylesRoundedBtn from '../RondedArrowBtn/RoundedArrowBtn.module.scss';
import { getNumbers } from '../../helpers/getNumbers';
import { getSearchWith } from '../../helpers/searchHelper';
import { RoundedArrow } from '../RondedArrowBtn';
import { icons } from '../../shared/global/Icons';
import { scrollToTop } from '../../helpers/scrollToTop';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(total / perPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;
  const visiblePages = getNumbers(1, totalPages);

  const handlePageChange = (page: number) => {
    if (page === currentPage || page > totalPages || page < 1) {
      return;
    }

    const newSearchParam = getSearchWith(searchParams, {
      page: page.toString() || null,
    });

    setSearchParams(newSearchParam);
    scrollToTop();
  };

  return (
    <ul className={styles.pagination}>
      <li onClick={() => handlePageChange(currentPage - 1)}>
        <RoundedArrow icon={icons.arrowLeftDis} disabled={firstPage} />
      </li>

      <div className={styles.paginationNums}>
        {visiblePages.map(page => (
          <li key={page}>
            <button
              className={classNames(
                stylesRoundedBtn.arrowBtn,
                styles.paginationBtn,
                currentPage === page && styles.paginationBtnActive,
              )}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </div>

      <li onClick={() => handlePageChange(currentPage + 1)}>
        <RoundedArrow icon={icons.arrowRightDis} disabled={lastPage} />
      </li>
    </ul>
  );
};
