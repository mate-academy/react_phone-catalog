import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';
import { getFilteredProducts } from '../../helpers/getFilteredProducts';
import { Product } from '../../types/Product';
import { SortParams } from '../../types/SortParams';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';

import './ProductsList.scss';

type Props = {
  products: Product [];
};

const sortList = [
  { sort: 'Newest', value: 'year' },
  { sort: 'Alphabetically', value: 'name' },
  { sort: 'Cheapest', value: 'price' },
];

const itemsOnPage = [4, 8, 16, 'all'];

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || SortParams.Newest;
  const perPage = searchParams.get('perPage') || '4';
  const currentPage = searchParams.get('page') || '1';

  const lastIndex = +currentPage * +perPage;
  const firstIndex = lastIndex - (+perPage);

  const countOfPages = Math.ceil(products.length / +perPage);

  const visibleProductsWithSort = perPage === 'all'
    ? getFilteredProducts(products, { sort })
    : getFilteredProducts(products, { sort }).slice(firstIndex, lastIndex);

  const visibleProductsWithQuery = getFilteredProducts(products, { query });

  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWith({
      perPage: event.target.value.toString(),
      page: '1',
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWith({
      sort: event.target.value,
      page: '1',
    });
  };

  return (
    <div className="products" data-cy="productList">
      {!query && (
        <>
          <div className="dropdown">
            <p className="dropdown__title">
              Sort by
            </p>

            <select value={sort} onChange={handleSortChange} className="select">
              {sortList.map(item => (
                <option value={item.value} key={item.sort} className="option">
                  {item.sort}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdown dropdown--small">
            <p className="dropdown__title">
              Items on page
            </p>

            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="select select--small"
            >
              {itemsOnPage.map(item => (
                <option value={item} key={item} className="option">
                  {item}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {!query ? (
        <ul className="products__list" data-cy="cardsContainer">
          {visibleProductsWithSort.map(phone => (
            <li key={phone.id}>
              <ProductCard product={phone} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="products__list" data-cy="cardsContainer">
          {visibleProductsWithQuery.map(phone => (
            <li key={phone.id}>
              <ProductCard product={phone} />
            </li>
          ))}
        </ul>
      )}

      {(perPage !== 'all' && !query && products.length > 4) && (
        <Pagination
          countOfPages={countOfPages}
        />
      )}
    </div>
  );
};
