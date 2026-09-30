import { ProductList } from '../../Product/ProductList/ProductList';
import { useSortedProducts } from '../../Sorting/Sorting';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { usePagination } from '../Pagination/usePagination';
import './Accessorie.scss';

export const Accessories = () => {
  const { products, isLoading, errorMessage, refetch } =
    useFetchProducts();
  const accessories = products.filter(
    product => product.category === 'accessories',
  );
  const { sorted, sortType, setSearchParams } =
    useSortedProducts(accessories);
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
    <div className="accessories">
      <h2 className="accessories__title">Accessories</h2>
      <span className="accessories__count">
        {accessories.length} models
      </span>

      <div className="accessories__filters">
        <div className="accessories__filter">
          <label>
            <p className="accessories__filter--label">
              Sort by
            </p>
            <select
              className="accessories__filter--select"
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
        <div className="accessories__filter">
          <label>
            <p className="accessories__filter--label">
              {' '}
              Items on page
            </p>
            <select
              className="accessories__filter--select"
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

      {accessories.length !== 0 ? (
        <ProductList products={paginatedItems} />
      ) : (
        <p>There are no accessories</p>
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
