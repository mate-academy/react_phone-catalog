// eslint-disable-next-line import/no-extraneous-dependencies
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ page, totalPages, onChange }) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      previousLabel={''}
      nextLabel={''}
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      containerClassName={styles.pagination}
      pageClassName={styles.pagination__item}
      pageLinkClassName={styles.pagination__link}
      activeClassName={styles.pagination__itemActive}
      disabledClassName={styles.pagination__itemDisabled}
      previousClassName={styles.pagination__prev}
      nextClassName={styles.pagination__next}
      breakClassName={styles.pagination__break}
    />
  );
};
