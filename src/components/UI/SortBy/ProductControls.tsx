import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ProductContols.module.scss';
import icons from '../../../assets/icons/icons.svg';
import { Pagination } from '../Pagination';

export const ProductControls = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get('sort') || 'age';

  const [sort, setSort] = useState(initialSort);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('sort', sort);

    if (sort !== 'age') params.set('sort', sort);

    navigate({ search: params.toString() });
  }, [sort, navigate]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSort(e.target.value);

  return (
    <div className={styles.selectContainer}>
      <div className={styles.selectWrapper}>
        <span className={styles.sortName}>Sort by</span>
        <select
          className={styles.dropDownMenu}
          value={sort}
          onChange={handleSortChange}
        >
          <option value="age">Newest</option>
          <option value="title">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>
        <span className={styles.arrow}>
          <svg>
            <use href={`${icons}#arrow-down-icon`}></use>
          </svg>
        </span>
      </div>

      <Pagination />
    </div>
  );
};
