import { Pagination } from '../Pagination/Pagination';
import { ProductList } from '../../Product/ProductList/ProductList';
import { useSortedProducts } from '../../Sorting/Sorting';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';
import { usePagination } from '../Pagination/usePagination';
import './Phones.scss';

export const Phones = () => {
  const { products, isLoading, errorMessage, refetch } =
    useFetchProducts();
  const phones = products.filter(
    product => product.category === 'phones',
  );
  const { sorted, sortType, setSearchParams } =
    useSortedProducts(phones);
  const {
    page,
    perPage,
    paginatedItems,
    total,
    onPageChange,
    onPerPage,
  } = usePagination(sorted);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    {
      return (
        <div>
          <p>Oops, something went wrong</p>
          <button onClick={refetch}>Reload</button>
        </div>
      );
    }
  }

  return (
    <div className="phones">
      <h2 className="phones__title">Mobile Phones</h2>
      <span className="phones__count">
        {phones.length} models
      </span>

      <div className="phones__filters">
        <div className="phones__filter">
          <label>
            <p className="phones__filter--label">Sort by</p>
            <select
              className="phones__filter--select"
              onChange={event => {
                setSearchParams({
                  sort: event.target.value,
                });
              }}
              value={sortType ?? 'age'}
            >
              <option value="age">Newest</option>
              <option value="price">Cheapest</option>
              <option value="title">Alphabetic</option>
            </select>
          </label>
        </div>
        <div className="phones__filter">
          <label>
            <p className="phones__filter--label">
              Items on page
            </p>
            <select
              className="phones__filter--select"
              onChange={event =>
                onPerPage(event.target.value)
              }
              value={perPage ?? '16'}
            >
              <option value="16">16</option>
              <option value="8">8</option>
              <option value="4">4</option>
              <option value="all">all</option>
            </select>
          </label>
        </div>
      </div>
      {phones.length !== 0 ? (
        <ProductList products={paginatedItems} />
      ) : (
        <p>There are no phones</p>
      )}
      {perPage !== 'all' && (
        <Pagination
          total={total}
          onPageChange={onPageChange}
          perPage={Number(perPage)}
          currentPage={page}
        />
      )}
    </div>
  );
};
