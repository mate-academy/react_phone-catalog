import styles from './ItemsOnPage.module.scss';
import icons from '../../../assets/icons/icons.svg';
import { PerPageOption } from '../../../types/Sort';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';

export const ItemsOnPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = +(searchParams.get('perPage') || PerPageOption.Sixteen);

  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);
    setSearchParams(search);
  }

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWith({ perPage: +e.target.value });
  };

  return (
    <div className={styles.selectWrapper}>
      <div className={styles.selectControls}>
        <span className={styles.sortName}>Items on page</span>
        <select
          onChange={handlePerPageChange}
          value={perPage}
          className={styles.dropDownMenu}
        >
          <option value={PerPageOption.Four}>4</option>
          <option value={PerPageOption.Eight}>8</option>
          <option value={PerPageOption.Sixteen}>16</option>
          <option value={PerPageOption.All}>All</option>
        </select>

        <span className={styles.arrow}>
          <svg>
            <use href={`${icons}#arrow-down-icon`}></use>
          </svg>
        </span>
      </div>
    </div>
  );
};
