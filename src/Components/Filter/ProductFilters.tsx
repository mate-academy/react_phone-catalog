import { useSearchParams } from 'react-router-dom';
import styles from './ProductFilters.module.scss';

export const ProductFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', event.target.value);
    setSearchParams(searchParams);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (value === 'all') {
      searchParams.delete('perPage');
    } else {
      searchParams.set('perPage', value);
    }

    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label className={styles.label}>
          Sort by
          <select
            value={sort}
            onChange={handleSortChange}
            className={styles.select}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </label>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>
          Items on page
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className={styles.select}
          >
            <option value="all">All</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </label>
      </div>
    </div>
  );
};
