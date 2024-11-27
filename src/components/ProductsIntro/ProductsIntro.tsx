import { useContext } from 'react';
import styles from './ProductsIntro.module.scss';
import { ProductsContext } from '../../store/ProductsContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';

type Props = {
  category: string;
};

export const ProductsIntro: React.FC<Props> = ({ category }) => {
  const { products } = useContext(ProductsContext);

  const filteredProducts = products.filter(
    product => product.category.toLowerCase() === category.toLowerCase(),
  );

  const displayCategoryName =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className={styles.introContainer}>
      <Breadcrumbs />

      <h1 className={styles.introTitle}>
        {displayCategoryName === 'Phones'
          ? 'Mobile phones'
          : displayCategoryName}
      </h1>

      <p className={styles.modelsCount}>{filteredProducts.length} models</p>
    </div>
  );
};
