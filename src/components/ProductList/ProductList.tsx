import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useAppContext } from '../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { ResultsSearch } from '../ResultsSearch';
import { sortProducts } from '../../helpers/sortProducts';
import { NotResults } from '../NotResults';
import { Dropdowns } from '../Dropdowns';

import './productList.scss';
import { ProductItem } from '../ProductItem';
import { Pagination } from '../Pagination';

const optionSort = ['newest', 'hotprice', 'alphabetically'];
const viewPerPage = ['4', '8', '16', 'all'];

type Props = {
  products: Product[];
  title: string;
};

export const ProductList: FC<Props> = ({ products, title }) => {
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

  const sortedProducts = sortProducts(products, sortedBy);
  const visibleProducts = sortedProducts.slice(start, end);

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
        {!countProducts
          ? (
            <NotResults />
          ) : (
            <>
              <div className="product-list__dropdowns">
                <Dropdowns
                  options={optionSort}
                  startValue="Choose an option"
                  label="Sort by"
                  searchParamsKey="sortBy"
                />
                <Dropdowns
                  options={viewPerPage}
                  startValue="All"
                  label="Items on page"
                  searchParamsKey="perPage"
                />
              </div>

              <div className="product-list__content grid">
                {visibleProducts.map(product => (
                  <ProductItem product={product} key={product.id} />
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
};
