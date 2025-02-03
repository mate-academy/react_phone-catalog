import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import styles from './ProductsPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { Category } from '../../types/Category';
import { useParams, useSearchParams } from 'react-router-dom';
import { getSortedProducts } from '../../utils/getSortedProducts';
import { getPaginatedProducts } from '../../utils/getPaginatedProducts';
import { Pagination } from './components/Pagination';
import { Filtration } from './components/Filtration';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const ProductsPage = () => {
  const { products } = useProducts();
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const itemCategory = category as Category;

  const filteredByCategory = products.filter(
    product => product.category === itemCategory,
  );

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const defaultParams = {
    sortField: 'year',
    count: `${filteredByCategory.length}`,
    page: '1',
  };

  const sortField = searchParams.get('sortField') || defaultParams.sortField;
  const count = searchParams.get('count') || defaultParams.count;
  const page = Number(searchParams.get('page')) || Number(defaultParams.page);

  const totalPages =
    count === 'All' ? 1 : Math.ceil(filteredByCategory.length / Number(count));

  const sortedProducts = getSortedProducts(filteredByCategory, sortField);

  const paginatedProducts =
    count === 'All'
      ? sortedProducts
      : getPaginatedProducts(sortedProducts, page, Number(count));

  return (
    <div className={styles.products}>
      <div className={styles.products__breadcrumbs}>
        <Breadcrumbs />
      </div>
      <h1 className={styles.products__title}>
        {capitalizeFirstLetter(itemCategory)}
      </h1>
      <p className={styles.products__count}>
        {`${filteredByCategory.length} models`}
      </p>

      {!filteredByCategory.length ? (
        <h2 className={styles.products__items}>
          There are no {itemCategory} yet
        </h2>
      ) : (
        <>
          <Filtration
            defaultParams={defaultParams}
            sortField={sortField}
            count={count}
          />
          <div className={styles.products__product}>
            {paginatedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                path={`/${product.category}/${product.itemId}`}
                checkPrice
              />
            ))}
          </div>
          {count !== 'All' && totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} />
          )}
        </>
      )}
    </div>
  );
};
