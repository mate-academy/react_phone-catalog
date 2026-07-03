// #region imports
import { ProductPageEmpty } from './components/ProductPageEmpty';
import {
  ProductPageContent,
  ProductPageSkeleton,
} from './components/ProductPageContent';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { useProductsLoading } from './hooks/useProductsLoading';
import { useTranslation } from 'react-i18next';
import { Category } from '../shared/constants/categories';
import styles from './ProductPage.module.scss';
// #endregion

type Props = {
  category: Category;
};

export const ProductPage: React.FC<Props> = ({ category }) => {
  const { t } = useTranslation('categories');

  const { products, isLoading } = useProductsLoading(category);

  if (!isLoading && !products.length) {
    return <ProductPageEmpty category={category} />;
  }

  return (
    <section
      className={styles.productPage}
      aria-label={t(`categories.${category}`)}
    >
      <Breadcrumbs items={[{ label: t(`categories.${category}`) }]} />

      {isLoading ? (
        <ProductPageSkeleton />
      ) : (
        <ProductPageContent category={category} products={products} />
      )}
    </section>
  );
};
