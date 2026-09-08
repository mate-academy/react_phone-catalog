import { ProductType } from '../../types/ProductType';
import styles from './PaginationFilter.module.scss';
import { useFilters } from '../../../../store/FilterContext';

interface PaginationFilterProps {
  products: ProductType[];
  searchParams: URLSearchParams;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
  getNumbers: (from: number, to: number) => number[];
}

export const PaginationFilter: React.FC<PaginationFilterProps> = ({
  products,
}) => {
  const { handlePerPageChange, itemsPerPage, getNumbers } = useFilters();

  const items = getNumbers(1, products.length).map(n => `Item ${n}`);

  return (
    <div className={styles.pagination_filter__container}>
      <div className={styles.pagination_filter__field_grouped}>
        <label
          htmlFor="perPageSelector"
          className={styles.pagination_filter__title}
        >
          Items on page
        </label>
        <div className={styles.pagination_filter__select_container}>
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className={styles.pagination_filter__select}
            value={itemsPerPage}
            onChange={handlePerPageChange}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value={items.length}>All</option>
          </select>
        </div>
      </div>
    </div>
  );
};
