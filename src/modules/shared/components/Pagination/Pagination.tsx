import classNames from 'classnames';
import styles from './Pagination.module.scss';

type Props = {
  productsPerPage: string;
  totalProducts: number;
  currentPage: string;
  paginate: (n: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  productsPerPage,
  totalProducts,
  currentPage,
  paginate,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / +productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={prevPage}
        className={classNames(styles.listButton, styles.listButtonLeft, {
          [styles.disabledLeftBtn]: +currentPage <= 1,
        })}
        disabled={+currentPage <= 1}
      />
      <ul className={styles.paginationList}>
        {pageNumbers.map(number => (
          <li
            key={number}
            className={classNames(styles.listItem, {
              [styles.isActiveItem]: +currentPage === number,
            })}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
      <button
        onClick={nextPage}
        className={classNames(styles.listButton, styles.listButtonRight, {
          [styles.disabledRightBtn]: +currentPage >= pageNumbers.length,
        })}
        disabled={+currentPage >= pageNumbers.length}
      />
    </div>
  );
};
