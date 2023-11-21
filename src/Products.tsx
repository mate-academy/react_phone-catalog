import React, {
  useState,
  useEffect,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { ProductCard } from './ProductCard';
import { SortTypes } from './types/SortTypes';
import { Product } from './types/Product';
import { getNumbers } from './utils/getNumbers';
import { Loader } from './Loader';
import { getProducts } from './api/products';
import { NoResults } from './NoResults';
import { ProductTypes } from './types/productTypes';
import { SearchTypes } from './types/SearchTypes';
import { useUpdateSearch } from './utils/hooks';
import { scrollToTop } from './utils/scrollTop';
import { Navigation } from './Navigation';

type Props = {
  productType: ProductTypes,
  type: string,
};

export const Products: React.FC<Props> = ({
  productType,
  type,
}) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[] | []>([]);
  const [phonesPerPage, setPhonesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortDropdownActive, setIsSortDropdownActive] = useState(false);
  const [isPageDropdownActive, setIsPageDropdownActive] = useState(false);
  const [sortOrder, setSortOrder] = useState('Newest');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const page = searchParams.get(SearchTypes.page) || 1;
  const perPage = searchParams.get(SearchTypes.perPage) || 8;
  const sort = searchParams.get(SearchTypes.sort) || 'newest';
  const query = searchParams.get('query');
  let filteredProducts = [...products];
  let pagesAmount = 0;
  let itemsPerPage = [...products];
  const { updateSearch } = useUpdateSearch();

  const getDevices = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await getProducts();

      setProducts([...response as Product[]].filter(
        product => product.type === type,
      ));
    } catch {
      setIsError(false);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  const moveLeft = () => (
    currentPage >= 2 && (
      onPageChange(currentPage - 1)
    )
  );

  const moveRight = () => (
    currentPage <= (pagesAmount - 1) && (
      onPageChange(currentPage + 1)
    )
  );

  const setProductsOrder = (sortType: SortTypes) => {
    setSortOrder(sortType);
    setIsSortDropdownActive(false);
    updateSearch({
      sort: String(sortType.toLowerCase()),
      page: String(1),
    });
  };

  const setPagesAmount = (pageNumber: number) => {
    setPhonesPerPage(pageNumber);
    setIsPageDropdownActive(false);
    setCurrentPage(1);
    updateSearch({
      page: String(1),
      perPage: String(pageNumber),
    });
  };

  const onWindowClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target && target.className) {
      const { className } = target;

      if (className !== 'products__dropdown_item'
        && className !== 'products__dropdown') {
        setIsSortDropdownActive(false);
        setIsPageDropdownActive(false);
      }
    }
  };

  document.body.addEventListener('click', onWindowClick);

  useEffect(() => {
    getDevices();
    setSortOrder(SortTypes.newest);
    setPhonesPerPage(8);

    return (document.body.removeEventListener('click', onWindowClick));
  }, [pathname]);

  useEffect(() => {
    if (pathname) {
      if (sort) {
        setSortOrder(sort[0].toUpperCase() + sort.slice(1));
      }

      if (page) {
        setCurrentPage(Number(page));
      }

      if (perPage) {
        setPhonesPerPage(Number(perPage));
      }

      setIsSortDropdownActive(false);
      setIsPageDropdownActive(false);
    }
  }, [sort, page, perPage, pathname]);

  if (query) {
    filteredProducts = filteredProducts.filter(
      item => item.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (sortOrder === SortTypes.newest) {
    filteredProducts.sort(
      (prevPhone, currPhone) => prevPhone.age - currPhone.age,
    );
  }

  if (sortOrder === SortTypes.alphabetically) {
    filteredProducts.sort(
      (prevPhone, currPhone) => prevPhone.name.localeCompare(currPhone.name),
    );
  }

  if (sortOrder === SortTypes.cheapest) {
    filteredProducts.sort(
      (prevPhone, currPhone) => prevPhone.price - currPhone.price,
    );
  }

  pagesAmount = Math.ceil(filteredProducts.length / phonesPerPage);

  itemsPerPage = [...filteredProducts].slice(
    (phonesPerPage * currentPage)
    - phonesPerPage, (phonesPerPage * currentPage),
  );

  return (
    <div className="products">

      <Navigation />
      <h1 className="products__title">
        {`${productType}`}
      </h1>

      {isLoading && (
        <div className="products__amount">
          0 models
        </div>
      )}

      {(!isLoading && !isError) && (
        <div className="products__amount">
          {`${products.length} models`}
        </div>
      )}

      {isLoading && (
        <Loader />
      )}

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {(!isLoading && !isError && filteredProducts.length > 0) && (
        <>
          <div className="products__filter_container">
            <div className="products__filter">
              <div className="products__text">Sort by</div>
              <button
                type="button"
                className="products__dropdown"
                onClick={() => {
                  setIsSortDropdownActive(!isSortDropdownActive);
                }}
              >
                {sortOrder}
              </button>
              <div className="products__cover" />
              <ul
                className={classNames(
                  'products__dropdown_list',
                  { 'products__dropdown_list--active': isSortDropdownActive },
                )}
              >
                <li
                  className="products__dropdown_item"
                >
                  <button
                    type="button"
                    className="products__dropdown_button"
                    onClick={() => setProductsOrder(SortTypes.newest)}
                  >
                    Newest
                  </button>
                </li>
                <li
                  className="products__dropdown_item"
                >
                  <button
                    type="button"
                    className="products__dropdown_button"
                    onClick={() => setProductsOrder(SortTypes.alphabetically)}
                  >
                    Alphabetically
                  </button>
                </li>
                <li
                  className="products__dropdown_item"
                >
                  <button
                    type="button"
                    className="products__dropdown_button"
                    onClick={() => setProductsOrder(SortTypes.cheapest)}
                  >
                    Cheapest
                  </button>
                </li>
              </ul>
            </div>
            <div className="products__filter">
              <div className="products__text">Items on page</div>
              <button
                type="button"
                className="products__dropdown"
                onClick={() => {
                  setIsPageDropdownActive(!isPageDropdownActive);
                }}
              >
                {phonesPerPage}
              </button>
              <div className="products__cover" />
              <ul
                className={classNames(
                  'products__dropdown_list',
                  { 'products__dropdown_list--active': isPageDropdownActive },
                )}
              >
                <li
                  className="products__dropdown_item"
                >
                  <button
                    type="button"
                    className="products__dropdown_button"
                    onClick={() => setPagesAmount(4)}
                  >
                    4
                  </button>
                </li>
                <li
                  className="products__dropdown_item"
                >
                  <button
                    type="button"
                    className="products__dropdown_button"
                    onClick={() => setPagesAmount(8)}
                  >
                    8
                  </button>
                </li>
                <li
                  className="products__dropdown_item"
                >
                  <button
                    type="button"
                    className="products__dropdown_button"
                    onClick={() => setPagesAmount(16)}
                  >
                    16
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="products__container">
            {itemsPerPage.map(phone => (
              <ProductCard product={phone} key={phone.id} />
            ))}
          </div>
          {filteredProducts.length > phonesPerPage && (
            <div className="products__page_container">
              <li className="products__page">
                <button
                  type="button"
                  data-cy="prevLink"
                  className={classNames(
                    'products__page_link',
                    { 'products__page_link--disabled': currentPage <= 1 },
                  )}
                  onClick={() => {
                    moveLeft();
                    updateSearch({ page: String(currentPage - 1) });
                  }}
                >
                  «
                </button>
              </li>

              {getNumbers(1, pagesAmount).map(item => (
                <li
                  className="products__page"
                  key={item}
                >
                  <button
                    type="button"
                    data-cy="pageLink"
                    className={classNames(
                      'products__page_link',
                      { 'products__page_link--active': currentPage === item },
                    )}
                    onClick={() => {
                      onPageChange(item);
                      updateSearch({ page: String(item) });
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}

              <li className="products__page">
                <button
                  type="button"
                  data-cy="nextLink"
                  className={classNames(
                    'products__page_link',
                    {
                      'products__page_link--disabled':
                      currentPage > (pagesAmount - 1),
                    },
                  )}
                  onClick={() => {
                    moveRight();
                    updateSearch({ page: String(currentPage + 1) });
                  }}
                >
                  »
                </button>
              </li>
            </div>
          )}
        </>
      )}

      {(!isLoading && !isError && filteredProducts.length === 0) && (
        <NoResults productType={productType} />
      )}
    </div>
  );
};
