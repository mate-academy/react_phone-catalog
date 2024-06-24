import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { scrollToTop } from '../footer/сomponents';
import { getSearchWith } from '../../helpers/searchHelper';

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

  return (
    <div className={styles.pagination}>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        forcePage={currentPage - 1}
        previousLabel={
          <div className={styles.pagination__img}>
            <img
              src="img/icons/slider-button.svg"
              alt=""
              className={styles.pagination__button}
            />
          </div>
        }
        nextLabel={
          <div
            className={`${styles.pagination__img} ${styles.pagination__img_right}`}
          >
            <img
              src="img/icons/slider-button.svg"
              alt=""
              className={styles.pagination__button}
            />
          </div>
        }
        breakLabel={'...'}
        breakLinkClassName={styles.pagination__paginationBreak}
        containerClassName={styles.pagination__paginationNums}
        pageClassName={styles.pagination__paginationBtn}
        activeClassName={styles.pagination__paginationBtnActive}
        pageLinkClassName={styles.pagination__paginationNum}
        activeLinkClassName={styles.pagination__paginationNumActive}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
