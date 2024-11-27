import styles from './SortByChar.module.scss';
import icons from '../../../assets/icons/icons.svg';
import { SortOrder } from '../../../types/Sort';
import { getSearchWith } from '../../../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../../types/Product';

interface SortByCharProps {
  filteredProducts: Product[];
  onSortChange: (sortedProducts: Product[]) => void;
}

export const SortByChar: React.FC<SortByCharProps> = ({
  filteredProducts,
  onSortChange,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const char = searchParams.get('char') || SortOrder.Newest;

  const setSearchWith = (params: any) => {
    const search = getSearchWith(searchParams, params);
    setSearchParams(search);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value || SortOrder.Newest;
    setSearchWith({ char: newSortOrder });

    if (newSortOrder === char) return;

    let sorted = [...filteredProducts];

    switch (newSortOrder) {
      case SortOrder.Alphabetically:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortOrder.Chipest:
        sorted.sort((a, b) => a.price - b.price);
        break;
      case SortOrder.Newest:
      default:
        sorted.sort((a, b) => b.year - a.year);
        break;
    }

    onSortChange(sorted);
  };

  return (
    <div className={styles.selectContainer}>
      <div className={styles.selectWrapper}>
        <span className={styles.sortName}>Sort by</span>
        <select
          className={styles.dropDownMenu}
          value={char}
          onChange={handleSortChange}
        >
          <option value={SortOrder.Newest}>Newest</option>
          <option value={SortOrder.Alphabetically}>Alphabetically</option>
          <option value={SortOrder.Chipest}>Cheapest</option>
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
