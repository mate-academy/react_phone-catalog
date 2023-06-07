import {
  useEffect, useState, useCallback, useMemo, useContext,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  updateSearchParams, sortProducts, SortOption,
} from '../../../helpers/helper';
import { Pagination } from '../../Pagination/Pagination';
import { Product } from '../../../types/Products';
import { ProductCard } from '../../ProductCard/ProductCard';
import { PageIndicator } from '../../PageIndicator/Phonespage/PageIndicator';
import '../ProductPage.scss';
import {
  ProductDataContext,
} from '../../ProductDataContext/ProductDataContext';
import { NoResults } from '../../NoResults/NoResults';

type ItemsPerPage = '4' | '8' | '16' | 'All';

export const AccessoriesPage: React.FC = () => {
  const category = 'accessories';
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = searchParams.get('perPage') as ItemsPerPage || '4';
  const query = searchParams.get('query');
  const currentPageFromParams = Number(searchParams.get('page') || '1');
  const [currentPage, setCurrentPage] = useState(currentPageFromParams);
  const products = useContext(ProductDataContext);

  const handleOnChange = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const sortByValue = event.target.value;

    searchParams.set('sort', sortByValue);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleItemsPerPage = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const itemsPerPageValue = event.target.value;

    searchParams.set('perPage', itemsPerPageValue);
    searchParams.set('page', '1');

    setSearchParams(searchParams);
    setCurrentPage(1);
  }, [searchParams, setSearchParams]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    setSearchParams(updateSearchParams(searchParams, {
      page: newPage.toString(),
    }));
  }, [searchParams, setSearchParams]);

  const paginatePhones = useCallback((phones: Product[]) => {
    if (itemsPerPage === 'All') {
      return phones;
    }

    const startIndex = (currentPage - 1) * parseInt(itemsPerPage, 10);

    return phones.slice(startIndex, startIndex + parseInt(itemsPerPage, 10));
  }, [itemsPerPage, currentPage]);

  const filteredPhones = useMemo(() => products.filter(
    (product) => product.category === category
      && (query === null
        || query === ''
        || product.name.toLowerCase().includes(query.toLowerCase())),
  ), [products, query, category]);

  const product = useMemo(() => sortProducts(
    filteredPhones,
    searchParams.get('sort') as SortOption || 'age',
  ), [filteredPhones, searchParams]);

  const paginatedProducts = useMemo(() => paginatePhones(product),
    [paginatePhones, product]);

  const totalPages = useMemo(() => (itemsPerPage === 'All'
    ? 1
    : Math.ceil(product.length / parseInt(itemsPerPage, 10))
  ), [itemsPerPage, product]);

  useEffect(() => {
    if (!searchParams.get('sort')) {
      setSearchParams(updateSearchParams(searchParams, { sort: 'age' }));
    }
  }, []);

  useEffect(() => {
    if (currentPage !== currentPageFromParams) {
      setCurrentPage(currentPageFromParams);
    }
  }, [currentPageFromParams]);

  return (
    <main className={`${category}-page`}>
      <div className={`${category}-page__container`}>
        <PageIndicator productType={category} />
        <h1 className={`${category}-page__title`}>{category.slice(0, 1).toUpperCase() + category.slice(1)}</h1>
        <p className={`${category}-page__subtitle`}>{`${product.length} models`}</p>
        {product.length > 0 ? (
          <>
            <div className={`${category}-page__navigation-filter`}>
              <div className={`${category}-page__sort-by`}>
                <label className={`${category}-page__label`} htmlFor="sort-by">Sort by:</label>
                <select
                  className={`${category}-page__select`}
                  id="sort-by"
                  name="sort-by"
                  onChange={handleOnChange}
                >
                  <option value="age">Newest</option>
                  <option value="price">Cheapest</option>
                  <option value="name">Alphabetically</option>
                </select>
              </div>
              <div className={`${category}-page__items-per-page`}>
                <label className={`${category}-page__label`} htmlFor="items-per-page">Items per page:</label>
                <select
                  className={`${category}-page__select`}
                  id="items-per-page"
                  name="items-per-page"
                  onChange={handleItemsPerPage}
                  value={itemsPerPage}
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="All">All</option>
                </select>
              </div>
            </div>
            <div data-cy="productList" className={`${category}-page__row`}>
              {paginatedProducts?.map((item) => (
                <ProductCard
                  key={item.id}
                  card={item}
                />
              ))}
            </div>

            {itemsPerPage !== 'All' && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                category={category}
              />
            )}
          </>
        ) : (
          <NoResults category={category} />
        )}
      </div>
    </main>
  );
};
