import classNames from 'classnames';
import styles from './ProductFilter.module.scss';
import { CustomSelect } from '../ui/CustomSelect';

const listSortBy = ['Newest', 'Hot Price', 'Price'];
const listOfPages = ['1', '2', '3', '4'];

export const ProductFilter = () => {
  return (
    <form className={styles['product-filter']}>
      <div className="product-filter__title-block">
        <h2>Mobile Phones</h2>
        <p
          className={classNames(
            'small-text',
            styles['product-filter__description'],
          )}
        >
          95 models
        </p>
      </div>

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
          <CustomSelect options={listSortBy} />
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
          <CustomSelect options={listOfPages} label="page" />
        </div>
      </div>
    </form>
  );
};
