import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { Phones } from '../../Components/Phones';
import { Spinner } from '../../Components/Spinner';
import { getProductsByType } from '../../helpers/getProductsByType';
import { SearchContext } from '../../variables/contexts';
import { SortLink } from '../../Components/SortLink/SortLink';
import { PaginateLink } from '../../Components/PaginateLink';
import { Pagination } from '../../Components/Pagination';
import { Error } from '../../Components/Error';
import { EmptyNotification } from '../../Components/EmptyNotification';
import './CatalogePage.scss';

type PropTypes = {
  product: string;
};

export const PhonesPage: React.FC<PropTypes> = ({ product }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<string>('Choose an option');
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [openPagintation, setOpenPagination] = useState<boolean>(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLButtonElement>(null);

  const DAFAULT_PAGE = '1';
  const DEFAULT_ITEMS_PER_PAGE = 8;
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const isReversed = searchParams.get('order') === 'desc';
  const sortBy = searchParams.get('sort') as keyof Product;
  const currentPage = +(searchParams.get('page') || DAFAULT_PAGE);
  const itemsPerPage = +(searchParams.get('perPage') || DEFAULT_ITEMS_PER_PAGE);

  const {
    setAppliedQuery,
    setSearchVisible,
    setPlaceholder,
    appliedQuery,
    setQuery,
    applyQuery,
  } = useContext(SearchContext);

  useEffect(() => {
    setPlaceholder(`Search in ${product}...`);
    setQuery('');
    applyQuery('');
    setSearchVisible(true);
    setIsLoading(true);
    setIsError(false);
    setOpenPagination(false);
    getProducts()
      .then(receivedProducts => {
        setProducts(receivedProducts);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [location]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (menuRef.current
        && !menuRef.current.contains(event.target as HTMLElement)) {
        setOpenSort(false);
      }

      if (paginationRef.current
        && !paginationRef.current.contains(event.target as HTMLElement)) {
        setOpenPagination(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const goods = getProductsByType(products, product);

  useEffect(() => {
    const clearQuery = appliedQuery.toLowerCase().trim();

    setAppliedQuery(clearQuery);
  }, [appliedQuery]);

  const visiblePhones = goods.filter(({ color, capacity, name }) => (
    name.toLowerCase().trim().includes(appliedQuery)
    || color.toLowerCase().trim().includes(appliedQuery)
    || capacity.toLowerCase().trim().includes(appliedQuery)
  ));

  visiblePhones.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a[sortBy].localeCompare(b[sortBy]);
      case 'price':
        return +b[sortBy] - (+a[sortBy]);
      case 'year':
        return +b[sortBy] - (+a[sortBy]);
      default:
        return 0;
    }
  });

  if (isReversed) {
    visiblePhones.reverse();
  }

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItem = visiblePhones.slice(firstItemIndex, lastItemIndex);

  const quantity = visiblePhones.length;
  const totalPages = Math.ceil(quantity / itemsPerPage);

  if (isError) {
    return (
      <main className="catalog page__main">
        <Error />
      </main>
    );
  }

  const nameOfType = product[0].toUpperCase() + product.slice(1);

  return (
    <main className="catalog page__main">
      <div className="container">
        {!isLoading ? (
          <>
            <div className="catalog__root-box">
              <Link to="/">
                <img
                  src="img/Icons/home.svg"
                  alt="toHome"
                  className="catalog__home-img"
                />
              </Link>
              <img
                src="img/Icons/arr-right-hover.svg"
                alt="arr-right"
                className="catalog__arr-right"
              />
              <p className="catalog__root-name">{nameOfType}</p>
            </div>
            <h1 className="catalog__title">{nameOfType}</h1>
            <div className="catalog__information-wrapper">
              <p className="catalog__quantity">
                {quantity ? `${quantity} models` : 'There are no such models'}
              </p>
              {!!quantity && (
                <p className="catalog__information">
                  {`Page ${currentPage} (items ${firstItemIndex + 1} - ${lastItemIndex} of ${quantity})`}
                </p>
              )}
            </div>
            {quantity ? (
              <div className="catalog__sort-buttons">
                <div className="catalog__sort-left">
                  <p className="catalog__sort-title">
                    Sort by
                  </p>
                  <div className="catalog__dropdown-trigger">
                    <button
                      ref={menuRef}
                      type="button"
                      className="catalog__button-dropdown"
                      onClick={() => setOpenSort(!openSort)}
                    >
                      {defaultValue}
                      <img
                        src="img/Icons/arr-down.svg"
                        alt="dropdown"
                        className="catalog__drop-icon"
                      />
                    </button>
                    {openSort && (
                      <ul className="catalog__dropdown-content">
                        <li>
                          <SortLink
                            sort="name"
                            title="Alphabetically"
                            setDefaultValue={setDefaultValue}
                          />
                        </li>
                        <li>
                          <SortLink
                            sort="price"
                            title="Price"
                            setDefaultValue={setDefaultValue}
                          />
                        </li>
                        <li>
                          <SortLink
                            sort="year"
                            title="Newest"
                            setDefaultValue={setDefaultValue}
                          />
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className="catalog__sort-right">
                  <p className="catalog__sort-title">
                    Items on page
                  </p>
                  <div className="catalog__dropdown-trigger">
                    <button
                      ref={paginationRef}
                      type="button"
                      className="
                                catalog__button-dropdown
                                catalog__button-dropdown--right
                            "
                      onClick={() => setOpenPagination(!openPagintation)}
                    >
                      <span className="catalog__button-text">
                        {itemsPerPage}
                      </span>
                      <img
                        src="img/Icons/arr-down.svg"
                        alt="dropdown"
                        className="catalog__drop-icon"
                      />
                    </button>
                    {openPagintation && (
                      <ul className="catalog__dropdown-content">
                        {['4', '8', '16', 'All'].map(value => (
                          <li>
                            <PaginateLink
                              key={value}
                              value={value}
                              quantity={quantity}
                              defaultPage={DAFAULT_PAGE}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <EmptyNotification />
              </div>
            )}
          </>
        ) : (<Spinner />)}
        <div className="catalog__cataloge">
          <ul className="grid">
            <Phones products={currentItem} isLoading={isLoading} />
          </ul>
        </div>
        {!!quantity && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
          />
        )}
      </div>
    </main>
  );
};
