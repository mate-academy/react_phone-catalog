/* eslint-disable max-len */
import { useParams, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { Product } from '../types/Product';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { getSearchWith } from '../helpers/searchHelper';
import { PathLine } from '../components/pathLine';
import { ProductsContext } from '../components/ProductsContext';
import { Loader } from '../components/Loader';

export const Category: React.FC = () => {
  const {
    products, errorMessage, isLoading, favIds,
  } = useContext(ProductsContext);
  const [searchParams, setSearchParams] = useSearchParams();

  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const { category } = useParams();
  const path = category || 'phones';
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const perPage = +(searchParams.get('perPage') || 4);
  const currentPage = +(searchParams.get('page') || 1);

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchWith({ sort: event.target.value || null });
  }

  function handlePerPageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchWith({ perPage: event.target.value || null, page: 1 });
  }

  const typifiedProds = products.filter(p => {
    switch (path) {
      case 'favorites':
        return favIds.includes(p.id);
      default:
        return p.type === path.slice(0, -1);
    }
  });

  function getPreparedProds() {
    let result = [...typifiedProds];

    if (query) {
      result = typifiedProds.filter(
        (p: Product) => (p.name.toLowerCase()
          .includes(query.toLowerCase())
        ),
      );
    }

    result = result.sort((a, b) => {
      switch (sort) {
        case 'age':
        case 'price':
        case 'capacity':
          return +a[sort] - +b[sort];
        case 'ram':
          return +b[sort].slice(0, -2) - +a[sort].slice(0, -2);

        case 'name':
          return a.name.localeCompare(b.name);

        default:
          return 1;
      }
    });

    return result;
  }

  const total = getPreparedProds().length;
  let end = +currentPage * perPage;
  const start = end - perPage;

  if (end - 1 > total) {
    end = total;
  }

  const visibleProds = path === 'favorites' || query
    ? getPreparedProds()
    : getPreparedProds().slice(start, end);

  if (errorMessage) {
    return (<h1>{errorMessage}</h1>);
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!['phones', 'tablets', 'accesories', 'favorites'].includes(path)) {
    return (<h1>Page not found</h1>);
  }

  return (
    <div className="category">
      <PathLine />

      <h1 className="pageSection__title category__title">
        {path === 'phones'
          ? 'Mobile phones'
          : path[0].toUpperCase() + path.slice(1)}
      </h1>

      <p className="categories__link-subtitle category__subtitle">
        {`${query ? visibleProds.length : typifiedProds.length} models`}
      </p>

      <div className="category__products" data-cy="productList">
        {(path !== 'favorites' && !query) && (
          <>
            <div className="category__selects">
              <label
                htmlFor="sortSelector"
                className="category__selects-label"
              >
                Sort by
              </label>

              <svg className="category__selects-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47144C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z" fill="#B4BDC4" />
              </svg>

              <select
                id="sortSelector"
                className="category__selects-select"
                onChange={handleSortChange}
              >
                <option value="">Default</option>
                <option value="age">Newest</option>
                <option value="name">Alphabetically</option>
                <option value="price">Cheapest</option>
                <option value="capacity">Capasity</option>
                <option value="ram">Ram</option>
              </select>
            </div>

            <div className="category__selects">
              <label
                htmlFor="perPageSelector"
                className="category__selects-label"
              >
                Items on page
              </label>

              <svg className="category__selects-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47144C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z" fill="#B4BDC4" />
              </svg>

              <select
                id="perPageSelector"
                className="category__selects-select category__selects-select--pages"
                onChange={handlePerPageChange}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value={total}>all</option>
              </select>
            </div>
          </>
        )}

        {visibleProds.length
          ? (
            <div className="pageSection__container">
              {visibleProds.map(product => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          )
          : (
            <p className="pageSection__title">
              {
                path === 'favorites'
                  ? 'Nothing in your favorites list yet, why not add something? 🙂'
                  : `${path[0].toUpperCase() + path.slice(1)} not found`
              }
            </p>
          )}

        {(path !== 'favorites' && !query && visibleProds.length !== 0) && (
          <Pagination
            total={total}
            perPage={perPage}
          />
        )}

      </div>
    </div>
  );
};
