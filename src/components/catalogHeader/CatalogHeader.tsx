import { sortBy } from '../../helpers/constArrs';
import { Dropdown } from '../../pages/Dropdown';
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
        <h1 className={styles.catalogHeader__title}>{category}</h1>
        <p className={styles.catalogHeader__info}>
          {`${products.length}`} models
        </p>
        <Dropdown items={sortBy} />
      </div>
    </>
  );
};
