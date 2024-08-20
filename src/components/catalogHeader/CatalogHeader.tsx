import { itemsOnPage, sortBy } from '../../helpers/constArrs';
import { Dropdown } from '../Dropdown';
import { ProductInfo } from '../../types/ProductInfo';
import styles from './CatalogHeader.module.scss';
import Skeleton from 'react-loading-skeleton';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  products: ProductInfo[];
  category?: string;
  withoutDrop: boolean;
};

export const CatalogHeader: React.FC<Props> = ({
  products,
  category,
  withoutDrop,
}) => {
  return (
    <>
      <div className={styles.catalogHeader}>
        <div className={styles.catalogHeader__top}>
          <h1 className={styles.catalogHeader__title}>{category}</h1>
          <p className={styles.catalogHeader__info}>
            {`${products.length}` || <Skeleton />} models
          </p>
        </div>

        {!withoutDrop && (
          <div className={styles.catalogHeader__filters}>
            <div className={styles.catalogHeader__filter}>
              <span className={styles.catalogHeader__filterText}>Sort by</span>
              <Dropdown items={sortBy} params="sortBy" />
            </div>

            <div className={styles.catalogHeader__filter}>
              <span className={styles.catalogHeader__filterText}>
                Items on page
              </span>
              <Dropdown items={itemsOnPage} params="onPage" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
