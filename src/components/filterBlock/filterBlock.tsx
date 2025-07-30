import { Dropdown } from '../dropdown';
import styles from './filterBlock.module.scss';

export const FilterBlock = () => {
  const optionsSort = ['Newest', 'Alphabetically', 'Cheapest'];
  const optionsQuantity = ['all', '4', '8', '16'];

  return (
    <div className={styles.filterBlock}>
      <Dropdown options={optionsSort} sortBy />
      <Dropdown options={optionsQuantity} />
    </div>
  );
};
