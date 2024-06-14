import { itemsOnPage, sortBy } from '../../helpers/constArrs';
import { Dropdown } from '../Dropdown';
import { ProductInfo } from '../../types/ProductInfo';
import styles from './CatalogHeader.module.scss';

type Props = {
  products: ProductInfo[];
  category?: string;
};

export const CatalogHeader: React.FC<Props> = ({ products, category }) => {
  return (
    <>
      <div className={styles.catalogHeader}>
        <div className={styles.catalogHeader__top}>
          <h1 className={styles.catalogHeader__title}>{category}</h1>
          <p className={styles.catalogHeader__info}>
            {`${products.length}`} models
          </p>
        </div>

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
      </div>
    </>
  );
};
