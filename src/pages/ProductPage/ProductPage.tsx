import styles from './ProductPage.module.scss';
import { Products } from '../../components/Products/Products';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CategoryDates,
  CategorySrc,
  findCategoryDates,
} from '../../types/Categorys';
import { NotFoundPage } from '../NotFoundPage';
import { ProductContext } from '../../components/Contexts/ProductsContext';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';
import { NotFound } from '../../components/NotFound';

export const ProductPage: React.FC = () => {
  const { products, loading, error } = useContext(ProductContext);

  const [pageLoad, setPageLoad] = useState(true);

  const pageSrc = useLocation().pathname as CategorySrc;

  const [category, setCategory] = useState<CategoryDates | null>(null);

  const categoryItems = useMemo(() => {
    if (category) {
      setPageLoad(false);

      return [...products].filter(
        product => product.category === category.name,
      );
    }

    return [];
  }, [category, products]);

  useEffect(() => {
    setPageLoad(true);
    setCategory(findCategoryDates(pageSrc));
  }, [pageSrc]);

  return (
    <div className={styles.productPage}>
      {(pageLoad || loading) && <Loader />}

      {!category && !pageLoad && <NotFoundPage />}

      {error && <ErrorMessage />}

      {!loading && !pageLoad && !error && category && !categoryItems.length && (
        <NotFound
          title={`There are no ${category.name} yet`}
          imgSrc={'product-not-found.png'}
        />
      )}

      {!loading && !error && category && categoryItems.length > 0 && (
        <Products category={category} categoryItems={categoryItems} />
      )}
    </div>
  );
};
