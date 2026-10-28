// pages/CategoryPage.tsx
import { useProducts } from '../shared/hooks/useProducts';
import { ProductList } from '../../components/ProductList';
import classNames from 'classnames/bind';

import styles from './CategoryPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
type Props = {
  category: string;
  title: string;
};

const cx = classNames.bind(styles);

export const CategoryPage = ({ category, title }: Props) => {
  const { products, isLoading, error } = useProducts(category);

  return (
    <main className={cx('category-page')}>
      <Breadcrumbs items={[{ label: 'Phones' }]} />
      <div className={cx('category-page__header')}>
        <h1 className={cx('category-page__title')}>{title}</h1>
        <p className={cx('category-page__products-count')}>
          {products.length} models
        </p>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && <ProductList products={products} />}
    </main>
  );
};
