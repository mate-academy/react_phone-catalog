import { useSearchParams } from 'react-router-dom';
import styles from './ProductFilters.module.scss';

export const ProductFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', event.target.value);
    setSearchParams(newParams);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value === '16') {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', value);
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label className={styles.label} htmlFor="select">
          Sort by
        </label>
        <select
          id="select"
          value={sort}
          onChange={handleSortChange}
          className={`${styles.select} ${styles.selectAll}`}
        >
          <option value="age">Newest</option>
          <option value="title">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label className={styles.label} htmlFor="selectAll">
          Items on page
        </label>
        <select
          id="selectAll"
          value={perPage}
          onChange={handlePerPageChange}
          className={styles.select}
        >
          <option value="16">16</option>
          <option value="24">24</option>
          <option value="32">32</option>
          <option value="64">64</option>
        </select>
      </div>
    </div>
  );
};
