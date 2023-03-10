import { FC, useMemo, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductItem } from './ProductItem';
import { Dropdowns } from './Dropdowns';
import { sortProducts } from '../helpers/sortProducts';
import { Breadcrumbs } from './Breadcrumbs';
import { Pagination } from './Pagination';
import { Product } from '../types/Product';
import { NotResults } from './NotResults';
import { ResultsSearch } from './ResultsSearch';
import { useAppContext } from '../context/AppContext';

const optionsSort = ['newest', 'alphabetically', 'price'];
const optionsItemsPage = ['4', '8', '16', 'all'];

type Props = {
  products: Product[];
  title: string;
};

export const ProductList: FC<Props> = memo(({ products, title }) => {
  const { isShowResSearch, productsToSearch } = useAppContext();
  const [searchParams] = useSearchParams();
  const countProducts = products.length;
  const currentPage = Number(searchParams.get('page')) || 1;
  const sortedBy = searchParams.get('sortBy') || '';
  const perPage = Number(searchParams.get('perPage')) || countProducts;
  const lastPage = Math.ceil(countProducts / perPage);
  const isPaginationShow = perPage !== countProducts && lastPage > 1;

  const start = currentPage * perPage - perPage;
  const end = currentPage * perPage <= countProducts
    ? currentPage * perPage
    : countProducts;

  const visibleProducts = products.slice(start, end);

  const sortedProducts = useMemo(
    () => sortProducts(visibleProducts, sortedBy),
    [visibleProducts],
  );

  if (isShowResSearch) {
    return <ResultsSearch products={productsToSearch} />;
  }

  return (
    <div className="product-list">
      <div className="product-list__container">
        <div className="product-list__top-row">
          <Breadcrumbs />
        </div>
        <h1 className="product-list__title title">{title}</h1>
        <p className="product-list__count">{`${countProducts} models`}</p>
        {countProducts === 0 ? (
          <NotResults />
        ) : (
          <>
            <div className="product-list__dropdowns">
              <Dropdowns
                options={optionsSort}
                startValue="Choose an option"
                label="Sort by"
                searchPramsKey="sortBy"
              />
              <Dropdowns
                options={optionsItemsPage}
                startValue="All"
                label="Items on page"
                searchPramsKey="perPage"
              />
            </div>

            <div className="product-list__content grid">
              {sortedProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
        <div className="product-list__pagination">
          {isPaginationShow && (
            <Pagination
              total={countProducts}
              perPage={perPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
});
