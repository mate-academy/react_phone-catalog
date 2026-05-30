import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../../shared/Breadcrumb';
import { Product } from '../../shared/Product';
import { useProducts } from '../../contexts/ProductsContext';
import { Loading } from '../../shared/Loading';
import { ErrorPage } from '../ErrorPage';
import { getCurrentProducts } from '../../utils/getCurrentProducts';
import { Pagination } from '../../components/Pagination';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import styles from './CategoryPage.module.scss';
import { Filters } from './Filters/Filters';

type SelectValue = 'All' | '4' | '8' | '16';
type SortValue = 'Newest' | 'Alphabetical' | 'Cheapest';

interface CategoryPageProps {
  category: string;
  title: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  title,
}) => {
  const { products, error, isLoading } = useProducts();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const [searchParams, setSearchParams] = useSearchParams();

  const perPageParam = searchParams.get('perPage');
  const sortParam = searchParams.get('sort');
  const pageParam = searchParams.get('page');

  const selectedValue = (perPageParam as SelectValue) || 'All';
  const selectedSort = (sortParam as SortValue) || 'Newest';

  const currentPage = Number(pageParam) || 1;
  const perPage = selectedValue === 'All' ? null : Number(selectedValue);

  const filteredProducts = products
    ?.filter(product => product.category === category)
    .sort((a, b) => {
      if (selectedSort === 'Newest') {
        return b.year - a.year;
      }

      if (selectedSort === 'Alphabetical') {
        return a.name.localeCompare(b.name);
      }

      return a.price - b.price;
    });

  const currentProducts = getCurrentProducts(
    filteredProducts,
    perPage,
    currentPage,
  );

  const handleFiltersChange = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <main>
      <section className={styles.products}>
        <div className={styles.container}>
          <Breadcrumb pathnames={pathnames} />
          <h1 className={styles.products__title}>{title}</h1>

          <span className={styles.products__count}>
            {filteredProducts.length} models
          </span>

          <Filters
            selectedValue={selectedValue}
            selectedSort={selectedSort}
            onChange={handleFiltersChange}
          />

          <div className={styles.products__list}>
            {currentProducts.map(product => (
              <Product
                key={product.id}
                product={product}
                fullPriceActive={true}
              />
            ))}
          </div>

          {perPage && (
            <Pagination
              total={filteredProducts.length}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={handleFiltersChange}
            />
          )}
        </div>
      </section>
    </main>
  );
};
