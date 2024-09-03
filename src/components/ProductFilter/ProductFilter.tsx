import classNames from 'classnames';
import styles from './ProductFilter.module.scss';
import { CustomSelect } from '../ui/CustomSelect';
import { SortBy } from '../../types/SortBy';
import { useSearchParams } from 'react-router-dom';

const listSortBy: SortBy[] = [
  SortBy.Newest,
  SortBy.Alphabetically,
  SortBy.Cheapest,
];

const listOfPages = ['4', '8', '16', 'All'];

type ProductFilterProps = {};

export const ProductFilter: React.FC<ProductFilterProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') || '';
  const sort = searchParams.get('sort') || '';

  // Handle option selection and update URL
  const handleSelectOption = (option: string, type: string) => {
    const params = new URLSearchParams(searchParams);

    if (type === 'page') {
      if (option === 'All') {
        params.delete('perPage');
        params.delete('page');
      } else {
        params.set('perPage', option);
        params.delete('page'); // set first page if perPage changed
      }
    }

    if (type === 'sort') {
      params.set('sort', option);
    }

    setSearchParams(params);
  };

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
            value={sort}
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
            value={perPage}
            onSelect={option => handleSelectOption(option, 'page')}
            label="page"
          />
        </div>
      </div>
    </form>
  );
};
