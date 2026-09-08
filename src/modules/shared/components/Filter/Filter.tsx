import { useFilters } from '../../../../store/FilterContext';
import styles from './Filter.module.scss';

interface FilterProps {
  filter: string;
}

export const Filter: React.FC<FilterProps> = ({ filter }) => {
  const { handleFilterChange, filterValues } = useFilters();

  return (
    <div className={styles.filter__container}>
      <div className={styles.filter__field_grouped}>
        <label htmlFor="productFilter" className={styles.filter__title}>
          Sort by
        </label>
        <div className={styles.filter__select_container}>
          <select
            value={filter}
            onChange={handleFilterChange}
            className={styles.filter__select}
            id="productFilter"
          >
            <option value="All" className={styles.filter__option}>
              All
            </option>
            {filterValues.map(value => (
              <option
                value={value}
                key={value}
                className={styles.filter__option}
              >
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
