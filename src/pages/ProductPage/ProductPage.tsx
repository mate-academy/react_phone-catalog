import styles from './ProductPage.module.scss';
import { Products } from '../../components/Products/Products';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CategoryDates,
  CategorySrc,
  findCategoryDates,
} from '../../types/Categorys';
import { NotFoundPage } from '../NotFoundPage';
import { ProductContext } from '../../components/Contexts/ProductsContext';
import { ProductsType } from '../../types/Products';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';
import { NotFound } from '../../components/NotFound';

export const ProductPage: React.FC = () => {
  const { products, loading, error } = useContext(ProductContext);

  const pageSrc = useLocation().pathname as CategorySrc;

  const [category, setCategory] = useState<CategoryDates | null>(null);
  const [categoryItems, setCategoryItems] = useState<ProductsType[]>([]);

  const findCategoryItems = () => {
    if (category) {
      setCategoryItems(
        [...products].filter(product => product.category === category.name),
      );
    }
  };

  useEffect(() => {
    setCategory(findCategoryDates(pageSrc));
  }, [pageSrc]);

  useEffect(() => {
    findCategoryItems();
  }, [category, products]);

  return (
    <div className={styles.productPage}>
      {!category && <NotFoundPage />}

      {error && <ErrorMessage />}

      {loading && <Loader />}

      {!loading && !error && category && !categoryItems.length && (
        <NotFound
          title={`There are no ${category.name} yet`}
          imgSrc={'product-not-found.png'}
        />
      )}

      {!loading && !error && category && categoryItems.length && (
        <Products category={category} categoryItems={categoryItems} />
      )}
    </div>
  );
};
