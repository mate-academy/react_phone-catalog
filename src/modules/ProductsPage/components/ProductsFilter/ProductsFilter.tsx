import styles from './ProductsFilter.module.scss';
import classNames from 'classnames';
import { Dropdown } from '../../../shared/Dropdown';
import { FilterSort } from '../../../../types/FilterSort';

type Filter = string[];

const pageOptions: Filter = ['4', '8', '16', 'all'];

export const ProductsFilter = () => {
  return (
    <div className={styles.ProductsFilter}>
      <div
        className={classNames(
          styles.ProductsFilter__filterBlock,
          styles.ProductsFilter__filterBlock_sort,
        )}
      >
        <p className={styles.ProductsFilter__filterTitle}>Sort by</p>
        <Dropdown
          name="sort"
          values={Object.keys(FilterSort)}
          defaultValue={Object.keys(FilterSort)[0]}
        />
      </div>

      <div
        className={classNames(
          styles.ProductsFilter__filterBlock,
          styles.ProductsFilter__filterBlock_perPage,
        )}
      >
        <p className={styles.ProductsFilter__filterTitle}>Items on page</p>
        <Dropdown
          name="perPage"
          values={pageOptions}
          defaultValue={pageOptions[pageOptions.length - 1]}
        />
      </div>
    </div>
  );
};
