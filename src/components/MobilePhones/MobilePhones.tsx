import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination/Pagination';
import { ProductsList } from '../ProductsList/ProductsList';
import { Dropdown } from '../Dropdown/Dropdown';
import { ITEMS_ON_PAGE, SORT_OPTIONS } from '../../helpers/constants';
import { Product } from '../../types/Product';
import { sortProducts } from '../../helpers/sortProducts';
import { SortType } from '../../types/SortType';
import './MobilePhones.scss';
import { searchProducts } from '../../helpers/searchProduct';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';

type Props = {
  phones: Product[],
};

export const MobilePhones: React.FC<Props> = ({ phones }) => {
  const productsAmount = phones
    .filter((product: Product) => product.category === 'phones').length;

  const [searchParams] = useSearchParams();

  const perPage = Number(searchParams.get('perPage')) || productsAmount;
  const currentPage = Number(searchParams.get('page') || 1);
  const sortBy = searchParams.get('sortBy') || SortType.Newest;
  const searchQuery = searchParams.get('query') || '';
  const isSearchEmpty = searchQuery.trim() === '';

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  const pagesAmount = Math.ceil(productsAmount / perPage);

  const sortedByYear = sortProducts([...phones], sortBy);
  let shownProducts = sortedByYear.slice(start, end);
  const isPaginationShown = pagesAmount !== 1;

  if (!isSearchEmpty) {
    shownProducts = searchProducts(searchQuery, [...phones]);
  }

  return (
    <div className="mobile-phones">
      {isSearchEmpty && (
        <div className="mobile-phones__page-details">
          <h1
            className="mobile-phones__title"
          >
            Mobile phones
          </h1>

          <span
            className="mobile-phones__models-amount"
          >
            {`${productsAmount} model${productsAmount !== 1 ? 's' : ''}`}
          </span>
        </div>
      )}

      {isSearchEmpty && (
        <div className="mobile-phones__filters">
          <div className="mobile-phones__dropdown-big">
            <Dropdown
              label="Sort by"
              options={SORT_OPTIONS}
              defaultOption="Newest"
              queryParam="sortBy"
            />
          </div>
          <div className="mobile-phones__dropdown-medium">
            <Dropdown
              label="Items on page"
              options={ITEMS_ON_PAGE}
              defaultOption="all"
              queryParam="perPage"
            />
          </div>
        </div>
      )}

      {!isSearchEmpty && (
        <div
          className="mobile-phones__search-results"
        >
          <span
            className="mobile-phones__search-results-amount"
          >
            {`${shownProducts.length} result${shownProducts.length !== 1 ? 's' : ''}`}
          </span>
        </div>
      )}

      <div
        data-cy="productList"
      >
        <div
          className="mobile-phones__products"
        >
          <ProductsList products={shownProducts} />

          {!isSearchEmpty && shownProducts.length === 0 && (
            <NoSearchResults searchQuery={searchQuery} />
          )}
        </div>

        {isPaginationShown && isSearchEmpty
          && (
            <div>
              <Pagination
                pagesAmount={pagesAmount}
                currentPage={currentPage}
              />
            </div>
          )}
      </div>
    </div>
  );
};
