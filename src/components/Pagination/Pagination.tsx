import classNames from 'classnames';
import { Icon } from '../Icon/Icon';
import styles from './Pagination.module.scss';

// type PaginationProps = {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// };

const Pagination = () => {
  return (
    <div className={classNames(styles.pagination)}>
      <button
        className={classNames(styles.pagination__btn, {
          [styles['pagination__btn--disabled']]: true,
        })}
      >
        <Icon iconName="left" />
      </button>

      <div className={classNames(styles.pagination__pages)}>
        <button
          className={classNames(styles.pagination__btn, {
            [styles['pagination__btn--active']]: false,
          })}
        >
          1
        </button>
        <button
          className={classNames(styles.pagination__btn, {
            [styles['pagination__btn--active']]: true,
          })}
        >
          2
        </button>
        <button
          className={classNames(styles.pagination__btn, {
            [styles['pagination__btn--active']]: false,
          })}
        >
          3
        </button>
        <button
          className={classNames(styles.pagination__btn, {
            [styles['pagination__btn--active']]: false,
          })}
        >
          4
        </button>
      </div>

      <button
        className={classNames(styles.pagination__btn, {
          [styles['pagination__btn--disabled']]: false,
        })}
      >
        <Icon iconName="right" />
      </button>
    </div>
  );
};

export default Pagination;
