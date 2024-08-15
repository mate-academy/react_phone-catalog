import classNames from 'classnames';
import styles from './ProductFilter.module.scss';
import { CustomSelect } from '../ui/CustomSelect';
import { SortBy } from '../../types/SortBy';

const listSortBy: SortBy[] = [
  SortBy.Newest,
  SortBy.Alphabetically,
  SortBy.Cheapest,
];

const listOfPages = ['4', '8', '16', 'All'];

type ProductFilterProps = {
  handleSelectOption: (option: string, type: 'page' | 'sort') => void;
};

export const ProductFilter: React.FC<ProductFilterProps> = ({
  handleSelectOption,
}) => {
  return (
    <form className={styles['product-filter']}>
      <div className={styles['product-filter__controls']}>
        <div className={styles['product-filter__control']}>
          <p
            className={classNames(
              'small-text',
              styles['product-filter__label'],
            )}
          >
            Sort by
          </p>
          <CustomSelect
            options={listSortBy}
            onSelect={option => handleSelectOption(option, 'sort')}
          />
        </div>

        <div className={styles['product-filter__control']}>
          <p
            className={classNames(
              'small-text',
              styles['product-filter__label'],
            )}
          >
            Items on page
          </p>
          <CustomSelect
            options={listOfPages}
            onSelect={option => handleSelectOption(option, 'page')}
            label="page"
          />
        </div>
      </div>
    </form>
  );
};
