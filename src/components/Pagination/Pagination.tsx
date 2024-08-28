import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { Icon } from '../ui/Icon';
import { useSearchParams } from 'react-router-dom';

type PaginationProps = {
  totalItems: number;
};

export const Pagination: React.FC<PaginationProps> = ({ totalItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');

  const itemsPerPage = parseInt(
    searchParams.get('perPage') || totalItems.toString(),
    10,
  );

  const totalPagesCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (selectedItem: { selected: number }) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', (selectedItem.selected + 1).toString());

    if (params.get('page') === '1') {
      params.delete('page');

      setSearchParams(params);

      return;
    }

    setSearchParams(params);
  };

  if (+itemsPerPage === totalItems) {
    return null;
  }

  return (
    <div className={classNames(styles.pagination)}>
      <ReactPaginate
        previousLabel={<Icon iconName="left" />}
        nextLabel={<Icon iconName="right" />}
        breakLabel="..."
        pageCount={totalPagesCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageChange}
        forcePage={page - 1}
        containerClassName={styles.pagination__container}
        pageClassName={styles.pagination__btn}
        pageLinkClassName={styles.pagination__link}
        previousLinkClassName={styles.pagination__control}
        nextLinkClassName={styles.pagination__control}
        activeClassName={styles['pagination__btn--active']}
        previousClassName={classNames(
          styles.pagination__btn,
          page === 1 && styles['pagination__btn--disabled'],
        )}
        nextClassName={classNames(
          styles.pagination__btn,
          page === totalPagesCount && styles['pagination__btn--disabled'],
        )}
        disabledClassName={styles['pagination__btn--disabled']}
        breakClassName={styles.pagination__ellipsis}
      />
    </div>
  );
};
