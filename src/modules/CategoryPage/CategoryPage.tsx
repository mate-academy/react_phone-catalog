/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC } from 'react';
import { Category } from '../../types/Product';
import { ProductList } from './components/ProductList';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Filter } from './components/Filter';
import { useCategoryProducts } from './hooks/useCategoryProducts';
import s from './CategoryPage.module.scss';
import { Loader } from '../shared/components/Loader';
import { ErrorNotification } from '../shared/components/ErrorNotification';

interface Props {
  category: Category;
}

const categoryTitles = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const CategoryPage: FC<Props> = ({ category }) => {
  const { products, isLoading, errorMessage } = useCategoryProducts(category);
  const count = products.length;
  const breadcrumbs = [{ link: null, label: categoryTitles[category] }];
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main>
      <section className={s.container}>
        <Breadcrumbs paths={breadcrumbs} />
        <h1>{categoryTitles[category]}</h1>
        {isLoading && <Loader />}
        {errorMessage && (
          <ErrorNotification message={errorMessage} onReload={handleReload} />
        )}
        {!isLoading && !errorMessage && (
          <>
            <div className={s.count}>{count && count} models</div>
            <Filter />
            <ProductList products={products} />
          </>
        )}
      </section>
    </main>
  );
};
