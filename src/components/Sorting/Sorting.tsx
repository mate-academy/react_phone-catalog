import style from './Sorting.module.scss';
import { useSearchParams } from 'react-router-dom';

export const Sorting = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValues = ['Newest', 'Alphabetically', 'Cheapest'];
  const itemValues = [16, 24, 48];

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };

  const handleItemsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    searchParams.set('items', value);
    setSearchParams(searchParams);
  };

  return (
    <form action="#">
      <div className={style.sort}>
        <div className={style.sort__field}>
          <label htmlFor="sort">Sort by</label>
          <select
            className={`${style.sort__select} ${style['sort__select--items']}`}
            name="sort"
            defaultValue={searchParams.get('sort') || ''}
            onChange={handleSortChange}
          >
            {sortValues.map(value => (
              <option key={value} value={value.toLowerCase()}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className={style.sort__field}>
          <label htmlFor="items">Items on page</label>
          <select
            className={`${style.sort__select} ${style['sort__select--items']}`}
            name="items"
            defaultValue={searchParams.get('items') || ''}
            onChange={handleItemsChange}
          >
            {itemValues.map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};
