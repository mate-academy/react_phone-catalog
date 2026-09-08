import styles from './Sort.module.scss';
import { SortBy, SortByKeys } from '../../types/SortBy';
import { useSearchParams } from 'react-router-dom';

const Sort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value as SortByKeys;

    if (newSortBy === 'all') {
      searchParams.delete('sort');
      setSearchParams(searchParams);

      return;
    }

    searchParams.set('sort', newSortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.sort}>
      <span>Sort by</span>
      <div className={styles.select}>
        <select
          defaultValue={searchParams.get('sort') || 'all'}
          onChange={handleSearchChange}
        >
          {Object.entries(SortBy).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sort;
