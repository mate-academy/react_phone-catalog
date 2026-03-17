import styles from './SortByChar.module.scss';
import icons from '../../../assets/icons/icons.svg';
import { SortOrder } from '../../../types/Sort';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';

export const SortByChar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || SortOrder.Newest;

  const setSearchWith = (params: Record<string, string>) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value || SortOrder.Newest;

    setSearchWith({ sort: newSortOrder, page: '1' });
  };

  return (
    <div className={styles.selectContainer}>
      <div className={styles.selectWrapper}>
        <span className={styles.sortName}>Sort by</span>

        <select
          className={styles.dropDownMenu}
          value={sort}
          onChange={handleSortChange}
        >
          <option value={SortOrder.Newest}>Newest</option>
          <option value={SortOrder.Alphabetically}>Alphabetically</option>
          <option value={SortOrder.Cheapest}>Cheapest</option>
        </select>

        <span className={styles.arrow}>
          <svg>
            <use href={`${icons}#arrow-down-icon`} />
          </svg>
        </span>
      </div>
    </div>
  );
};
