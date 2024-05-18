import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import stylesRoundedBtn from '../RondedArrowBtn/RoundedArrowBtn.module.scss';
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

  const handlePageChange = ({ selected }: { selected: number }) => {
    const nextPage = selected + 1;
    const newSearchParams = getSearchWith(searchParams, {
      page: nextPage.toString(),
    });

    setSearchParams(newSearchParams);
    scrollToTop();
  };

  const totalPages = Math.ceil(total / perPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;

  return (
    <div className={styles.pagination}>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        forcePage={currentPage - 1}
        previousLabel={
          <RoundedArrow icon={icons.arrowLeftDis} disabled={firstPage} />
        }
        nextLabel={
          <RoundedArrow icon={icons.arrowRightDis} disabled={lastPage} />
        }
        breakLabel={'...'}
        breakLinkClassName={styles.paginationBreak}
        containerClassName={styles.paginationNums}
        pageClassName={classNames(
          stylesRoundedBtn.arrowBtn,
          styles.paginationBtn,
        )}
        activeClassName={styles.paginationBtnActive}
        pageLinkClassName={styles.paginationNum}
        activeLinkClassName={styles.paginationNumActive}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
