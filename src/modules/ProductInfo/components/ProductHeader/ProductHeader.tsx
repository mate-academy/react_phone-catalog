import { Link } from 'react-router-dom';
import { ProductsInfo } from '../../../../shared/types/ProductsInfo';
import { GoBack } from '../../../../components/GoBack';

import Home from '../../../../assets/icons/catalogIcons/Home.svg';
import ArrowRight from '../../../../assets/icons/arrow/rightDisabled.svg';
import styles from './ProductHeader.module.scss';

type ProductHeaderProps = {
  product: ProductsInfo | null;
};

export const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
  return (
    <div className={styles.productHeader}>
      <div className={styles.header__path}>
        <div className={styles.header__icon_home}>
          <img src={Home} alt="Home" />
        </div>
        <div className={styles.header__icon_arrow}>
          <img src={ArrowRight} alt="Arrow Right" />
        </div>
        <Link to={`/${product.category}`}>
          <h3 className={styles.header__title_page}>{product.category}</h3>
        </Link>
        <div className={styles.header__icon_arrow}>
          <img src={ArrowRight} alt="Arrow Right" />
        </div>
        <h3 className={styles.header__title_product}>{product.name}</h3>
      </div>

      <GoBack />

      <div className={styles.productHeader__title}>
        <h1 className={styles.title__text}>{product.name}</h1>
      </div>
    </div>
  );
};
