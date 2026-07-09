import styles from './CategoryControls.module.scss';

type Props = {
  sortBy: string;
  itemsPerPage: string;
  onSortChange: (value: string) => void;
  onItemsPerPageChange: (value: string) => void;
};

export const CategoryControls = ({
  sortBy,
  itemsPerPage,
  onSortChange,
  onItemsPerPageChange,
}: Props) => {
  return (
    <div className={styles.controls}>
      <label className={styles.field}>
        <span className={styles.label}>Sort by</span>

        <select
          className={styles.select}
          value={sortBy}
          onChange={event => onSortChange(event.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="cheapest">Cheapest</option>
        </select>
      </label>

      <label className={`${styles.field} ${styles.itemsField}`}>
        <span className={styles.label}>Items on page</span>

        <select
          className={styles.select}
          value={itemsPerPage}
          onChange={event => onItemsPerPageChange(event.target.value)}
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="all">All</option>
        </select>
      </label>
    </div>
  );
};
