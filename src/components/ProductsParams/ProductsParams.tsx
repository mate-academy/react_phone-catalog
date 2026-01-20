import { SortBy } from '../../shared/hooks/usePreparedProducts';
import styles from '../ProductsParams/ProductsParams.module.scss';

interface Props {
  sortBy: SortBy;
  onSortChange: (value: SortBy) => void;

  itemsPerPage: string | number;
  onItemsChange: (value: 'all' | number) => void;
}

export const ProductsParams = ({
  sortBy,
  onSortChange,
  itemsPerPage,
  onItemsChange,
}: Props) => {
  return (
    <div className={styles.params}>
      {/*SORT*/}
      <div className={styles.sort}>
        <p className={styles.title}> Sort By</p>

        <select
          value={sortBy}
          onChange={e => onSortChange(e.target.value as Props['sortBy'])}
          className={styles.select}
        >
          <option value="age"> Newest</option>
          <option value="title"> Alphabetically</option>
          <option value="price"> Cheapest</option>
        </select>
      </div>

      {/*ITEMS*/}
      <div className={styles.items}>
        <p className={styles.title}>Items on page</p>
        <select
          value={itemsPerPage}
          onChange={e =>
            onItemsChange(
              e.target.value == 'all' ? 'all' : Number(e.target.value),
            )
          }
          className={styles.select}
        >
          <option value="all"> All</option>
          <option value="4"> 4</option>
          <option value="8"> 8</option>
          <option value="16"> 16</option>
        </select>
      </div>
    </div>
  );
};
