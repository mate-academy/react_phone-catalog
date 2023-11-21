/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useCamelCase } from '../../hooks/useCamelCase';
import { filterByCategory, filterByName } from '../../utils/filterHelper';
import { useProducts } from '../../Store';
import { usePagination } from '../../hooks/usePagination';

import styles from './CatalogPage.module.scss';

import { Button } from '../../components/Button';
import { ShowLocation } from '../../components/ShowLocation';
import { Selector } from '../../components/Selector';
import { ProductCard } from '../../components/ProductCard';
import { sortProducts } from '../../utils/sortProducts';
import { Pagination } from '../../components/Pagination';

export const CatalogPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const products = useProducts(state => state.products);
  const currProducts = filterByCategory(products, category);
  const sortList = ['Newest', 'Name', 'Price'];
  const pageList = ['16', '8', '4', 'All'];
  const [searchParams] = useSearchParams();
  const perPage = +(searchParams.get('perPage') || 16);
  const sortBy = searchParams.get('sort') || 'Newest';
  const query = searchParams.get('query') || '';
  const visibleProducts = filterByName(sortProducts(products, sortBy), query);
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: !perPage ? visibleProducts.length : perPage,
    count: visibleProducts.length,
  });

  return (
    <>
      <ShowLocation />
      {!currProducts.length ? (
        <div className={styles.noProducts}>
          <p>{`${useCamelCase(category)} are out of stock :(`}</p>
          <Button
            className={styles.noProductsBtn}
            text="Go to Home"
            onClick={() => navigate('/')}
          />
        </div>
      ) : (
        <>
          <h1>
            {category === 'phones' ? 'Mobile phones' : useCamelCase(category)}
          </h1>
          <p className={`bodyText ${styles.countModels}`}>{`${visibleProducts.length} models`}</p>

          <div className={styles.sortWrapper}>
            <Selector title="Sort by" paramsKey="sort" list={sortList} />
            <Selector
              title="Items on page"
              paramsKey="perPage"
              list={pageList}
            />
          </div>
          {visibleProducts.length ? (
            <>
              <div className={styles.catalog}>
                {visibleProducts
                  .slice(firstContentIndex, lastContentIndex)
                  .map(prod => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
              </div>
              {totalPages > 1 && (
                <Pagination
                  nextPage={nextPage}
                  prevPage={prevPage}
                  setPage={setPage}
                  totalPages={totalPages}
                  page={page}
                />
              )}
            </>
          ) : (
            <h2>There are no matching results</h2>
          )}
        </>
      )}
    </>
  );
};
