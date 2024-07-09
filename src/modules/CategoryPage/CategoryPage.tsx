import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../shared/ProductCard';
import { Dropdown } from './Dropdown';
import { getItemsPerPage } from '../../services/getItemsPerPage';
import { client } from '../../api';
import { Product } from '../../types/Product';
import {
  optionsItemsPerPage,
  optionsSortBy,
} from '../constants/DROPDOWN_PARAMS';
import { getSortedProducts } from '../../services/getSortedProducts';
import { Loader } from '../shared/Loader';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { PRODUCT_URL } from "../constants/URL's/URL's";
import { Pagination } from './Pagination';
import { scrollToTop } from '../../services/scrollToTop';
import { Option } from '../../types/Option';
import { getSearchWith } from '../../services/getSearchWith';
import { WindowSizeContext } from '../../store/WindowSizeContext';

type Props = {
  title: string;
};

function getValue(
  searchParams: string | null,
  options: Option[],
  defaultValue: string,
): string {
  const foundOption = options.find(item => item.criteria === searchParams);

  return foundOption ? foundOption.value : defaultValue;
}

export const CategoryPage: React.FC<Props> = React.memo(({ title }) => {
  const { pathname } = useLocation();
  const category = pathname.slice(1);

  const { setScrollHeight } = useContext(WindowSizeContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || '';
  const sort = searchParams.get('sort') || '';
  const currentPage = searchParams.get('page') || '';
  const query = searchParams.get('query') || '';

  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLength, setProductsLength] = useState<number>(0);

  const defaultPerPage = optionsItemsPerPage[1];
  const defaultSort = optionsSortBy[0];

  const perPageValue = getValue(
    perPage,
    optionsItemsPerPage,
    defaultPerPage.value,
  );
  const sortValue = getValue(sort, optionsSortBy, defaultSort.value);

  useEffect(() => {
    setDataLoaded(false);
    setError(false);
    setProductsLength(0);

    client
      .get<Product[]>(PRODUCT_URL)
      .then(data => {
        const queryWords = query.split(' ');

        const getProducts = data
          .filter(product => product.category === category)
          .filter(product =>
            queryWords.every(word => product.name.toLowerCase().includes(word)),
          );

        const itemsPerPage = getItemsPerPage(
          perPage || defaultPerPage.criteria,
          getProducts.length,
        );

        const start = currentPage ? (+currentPage - 1) * itemsPerPage + 1 : 1;
        const end = currentPage
          ? Math.min(+currentPage * itemsPerPage, getProducts.length)
          : Math.min(itemsPerPage, getProducts.length);

        setProductsLength(getProducts.length);
        setProducts(
          getProducts
            .sort(getSortedProducts(sort || defaultSort.criteria))
            .slice(start - 1, end),
        );
        setDataLoaded(true);
        scrollToTop(false);
      })
      .catch(() => setError(true));
  }, [
    currentPage,
    perPage,
    category,
    sort,
    query,
    defaultPerPage.criteria,
    defaultSort.criteria,
  ]);

  useEffect(() => {
    setScrollHeight(document.documentElement.scrollHeight);
  }, [setScrollHeight, dataLoaded]);

  function handlePerPageChange(value: string) {
    const newPerPage = { perPage: value || null, page: null };

    setSearchParams(getSearchWith(searchParams, newPerPage));
  }

  function handleSelectSortBy(value: string) {
    const newSort = { sort: value || null, page: null };

    setSearchParams(getSearchWith(searchParams, newSort));
  }

  function handleSelectPage(value: number) {
    setDataLoaded(false);
    const newPage =
      value === 1 ? { page: null } : { page: value.toString() || null };

    setSearchParams(getSearchWith(searchParams, newPage));
  }

  return (
    <div className="category-page">
      <div className="category-page__route">
        <Breadcrumbs category={category} />
      </div>

      <div className="category-page__title">
        <h1 className="category-page__main-title primary-title">{title}</h1>
        {productsLength > 0 && !error && (
          <h4 className="category-page__sub-title">
            {`${productsLength} models`}
          </h4>
        )}
      </div>

      <div className="category-page__content-wrapper">
        {dataLoaded && !error && products.length > 0 && (
          <div className="category-page__content-container">
            <div className="category-page__dropdown-container">
              <div className="category-page__dropdown-sort">
                <Dropdown
                  title="Sort by"
                  currentValue={sortValue}
                  options={optionsSortBy}
                  setSelectedCriteria={value => handleSelectSortBy(value)}
                />
              </div>

              <div className="category-page__dropdown-items">
                <Dropdown
                  title="Items per page"
                  currentValue={perPageValue}
                  options={optionsItemsPerPage}
                  setSelectedCriteria={value => handlePerPageChange(value)}
                />
              </div>
            </div>

            <div className="category-page__product-card-container">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  discount={false}
                />
              ))}
            </div>

            {products.length !== productsLength && (
              <div className="category-page__navigation">
                <Pagination
                  total={productsLength}
                  perPage={getItemsPerPage(
                    perPage || defaultPerPage.criteria,
                    productsLength,
                  )}
                  currentPage={currentPage ? +currentPage : 1}
                  onPageChange={page => handleSelectPage(page)}
                />
              </div>
            )}
          </div>
        )}

        {!dataLoaded && !error && (
          <div className="category-page__min-height">
            <Loader />
          </div>
        )}

        {dataLoaded && !error && products.length === 0 && (
          <div className="category-page__min-height secondary-title">
            There are no {category} matching the {query}
          </div>
        )}
      </div>
    </div>
  );
});
