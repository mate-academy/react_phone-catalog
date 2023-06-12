import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';
import { FilterSelector } from '../FilterSelector/FilterSelector';
import { ProductsList } from '../ProductsList/ProductsList';
import { Pagination } from '../Pagination/Pagination';
import { Product } from '../../types/product';
import { NoResults } from '../NoResults/NoResults';
import { Loader } from '../Loader/Loader';
import {
  filterProducts,
  getSelectedTypeProducts,
} from '../../helpers/productsFunctions';
import { getItemsToShowIndex } from '../../helpers/pagination';
import { filters, pages } from '../../types/filters';
import './ProductsPage.scss';

type ProductsPageProps = {
  type: 'phone' | 'tablet' | 'accessory';
  title: string;
};

export const ProductsPage = ({ type, title }: ProductsPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('age');
  const [perPage, setPerPage] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getSelectedTypeProducts(type).then(setProducts);
  }, []);

  const onActiveFilterChange = (value: string) => setActiveFilter(value);
  const onPageChange = (value: number) => setPage(value);
  const onPerPageChange = (value: string) => {
    setPage(1);
    setPerPage(value);
  };

  const [from, to] = getItemsToShowIndex(perPage, page, products.length);
  const filteredProducts = filterProducts(products, activeFilter).slice(
    from,
    to,
  );

  return (
    <section className="products-page">
      <div className="products-page__crumbs">
        <BreadCrumbs />
      </div>

      {products.length > 0 ? (
        <>
          <h1 className="products-page__title">{title}</h1>
          <p className="products-page__count">{`${products.length} models`}</p>

          <div className="products-page__selectors">
            <FilterSelector
              name="sort"
              label="Sort by"
              width={176}
              options={filters}
              startValue={activeFilter}
              onChange={onActiveFilterChange}
            />

            <FilterSelector
              name="page"
              label="Items on page"
              width={128}
              options={pages}
              startValue={perPage}
              onChange={onPerPageChange}
            />
          </div>

          {isLoading && <Loader />}

          <div
            className={classNames('products-page__products-list', {
              'products-page__products-list--hidden': isLoading,
            })}
          >
            <ProductsList
              setLoading={setIsLoading}
              products={filteredProducts}
            />
          </div>

          {perPage !== 'all' && (
            <Pagination
              total={products.length}
              currentPage={page}
              onPageChange={onPageChange}
              perPage={perPage}
            />
          )}
        </>
      ) : (
        <NoResults categoryName={title} />
      )}
    </section>
  );
};
