import classNames from 'classnames';
import styles from './ProductFilter.module.scss';

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
          <label
            className={classNames(
              'small-text',
              styles['product-filter__label'],
            )}
            htmlFor="sortBy"
          >
            Sort by
          </label>
          <select
            className={styles['product-filter__select']}
            name="sortBy"
            id="sortBy"
          >
            <option value="newest">Newest</option>
            <option value="price">Price</option>
            <option value="hotPrice">Hot Price</option>
          </select>
        </div>

        <div className={styles['product-filter__control']}>
          <label
            className={classNames(
              'small-text',
              styles['product-filter__label'],
            )}
            htmlFor="itemsPerPage"
          >
            Items on page
          </label>
          <select
            className={styles['product-filter__select']}
            name="itemsPerPage"
            id="itemsPerPage"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="16">16</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>
    </form>
  );
};
