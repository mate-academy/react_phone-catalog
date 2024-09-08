import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import { ProductsList } from '../../components/ProductsList';
import { ProductType } from '../../types/ProductType';
import { useSearchParams } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Pagination } from '../../components/Pagination';
import classNames from 'classnames';
import { Icon } from '../../components/Icon';
import { Notification } from '../../components/Notification';

type Props = {
  type: string;
};

const prepareProducts = (
  products: ProductType[],
  sortField: string | null,
  query: string,
) => {
  let readyProducts = [...products];

  if (query) {
    readyProducts = readyProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (sortField) {
    switch (sortField) {
      case 'newest':
        return readyProducts.sort((a, b) => b.year - a.year);
      case 'alphabet':
        return readyProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return readyProducts.sort((a, b) => a.price - b.price);
      default:
        return readyProducts;
    }
  }

  return readyProducts;
};

export const CatalogPage: React.FC<Props> = ({ type }) => {
  const { products, phones, tablets, accessories, isLoading, errorMessage } =
    useContext(AppContext);
  const [preparedProducts, setPreparedProducts] = useState<ProductType[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortField, setSortField] = useState(
    searchParams.get('sort') || 'newest',
  );
  const [query, setQuery] = useState(searchParams.get('query') || '');

  //Dropdown
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isItemsDropdownOpen, setIsItemsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsSortDropdownOpen(false);
      setIsItemsDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown: string) => {
    if (dropdown === 'sort') {
      setIsSortDropdownOpen(!isSortDropdownOpen);
      setIsItemsDropdownOpen(false);
    } else if (dropdown === 'itemsPerPage') {
      setIsItemsDropdownOpen(!isItemsDropdownOpen);
      setIsSortDropdownOpen(false);
    }
  };

  //Pagination
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(searchParams.get('perPage')) || 4,
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemNumbers =
    (preparedProducts && [
      ...preparedProducts.slice(indexOfFirstItem, indexOfLastItem),
    ]) ||
    [];

  const handleSortFieldChange = (newSortField: string) => {
    setIsSortDropdownOpen(false);
    setSortField(newSortField);

    setSearchParams({
      sort: newSortField,
      perPage: searchParams.get('perPage') || '4',
      page: String(currentPage),
      query: query,
    });
  };

  const handleItemsPerPageChange = (newItemsPerPage: string) => {
    setIsItemsDropdownOpen(false);

    if (newItemsPerPage === 'all' && preparedProducts) {
      setItemsPerPage(preparedProducts.length);
    } else {
      setItemsPerPage(Number(newItemsPerPage) || 4);
    }

    setCurrentPage(1);

    setSearchParams({
      sort: sortField,
      perPage: newItemsPerPage,
      page: '1',
      query: query,
    });
  };

  useEffect(() => {
    if (query !== searchParams.get('query')) {
      setCurrentPage(1);
      setSearchParams(prevParams => {
        const newParams = new URLSearchParams(prevParams);

        newParams.set('page', '1');

        return newParams;
      });
    }
  }, [query, searchParams, setSearchParams]);

  const handlePageChange = (page: number) => {
    setIsSortDropdownOpen(false);
    setIsItemsDropdownOpen(false);
    setCurrentPage(page);

    setSearchParams({
      sort: sortField,
      perPage: searchParams.get('perPage') || '4',
      page: String(page),
      query: query,
    });
  };

  useEffect(() => {
    const sortParam = searchParams.get('sort');
    const perPageParam = searchParams.get('perPage');
    const queryParam = searchParams.get('query');

    if (sortParam) {
      setSortField(sortParam);
    }

    if (queryParam) {
      setQuery(queryParam);
    } else {
      setQuery('');
    }

    let productList: ProductType[] = [];

    switch (type) {
      case 'phones':
        productList = products.filter(product =>
          phones.some(phone => phone.category === product.category),
        );
        break;
      case 'tablets':
        productList = products.filter(product =>
          tablets.some(tablet => tablet.category === product.category),
        );
        break;
      case 'accessories':
        productList = products.filter(product =>
          accessories.some(
            accessory => accessory.category === product.category,
          ),
        );
        break;
      default:
        productList = [];
    }

    const readyProducts = prepareProducts(productList, sortField, query);

    setPreparedProducts(readyProducts);

    if (perPageParam === 'all') {
      setItemsPerPage(readyProducts.length);
    } else {
      setItemsPerPage(Number(perPageParam) || 4);
    }
  }, [
    accessories,
    phones,
    products,
    query,
    searchParams,
    sortField,
    tablets,
    type,
  ]);

  const sortOptions = ['newest', 'alphabet', 'cheapest'];
  const itemsPerPageOptions = ['4', '8', '16', 'all'];

  return (
    <div className="catalog page">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className="container">
            <Breadcrumbs className="catalog__breadcrumbs" />

            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

            {preparedProducts?.length === 0 && !errorMessage && !query && (
              <ErrorMessage errorMessage={`There are no ${type} yet`} />
            )}

            {preparedProducts && !errorMessage && (
              <>
                <h1 className="catalog__title page-title">
                  {type === 'phones'
                    ? 'Mobile phones'
                    : type === 'tablets'
                      ? 'Tablets'
                      : 'Accessories'}
                </h1>

                <span className="catalog__sub-text">{`${preparedProducts.length} models`}</span>

                <div className="catalog__selects">
                  <label className="catalog__label" htmlFor="sort">
                    Sort by
                    <div
                      id="sort"
                      className="catalog__select catalog__select--sort"
                      role="button"
                      tabIndex={0}
                      onClick={e => {
                        e.stopPropagation();
                        toggleDropdown('sort');
                      }}
                      onKeyDown={e =>
                        e.key === 'Enter' && toggleDropdown('sort')
                      }
                    >
                      {sortField === 'newest'
                        ? 'Newest'
                        : sortField === 'alphabet'
                          ? 'Alphabetically'
                          : 'Cheapest'}

                      {isSortDropdownOpen ? (
                        <Icon iconName="icon-arrow-up" />
                      ) : (
                        <Icon iconName="icon-arrow-down" />
                      )}
                    </div>
                    <ul
                      className={classNames('catalog__select-options', {
                        'catalog__select-options--active': isSortDropdownOpen,
                      })}
                      role="listbox"
                    >
                      {sortOptions.map(option => (
                        <li
                          key={option}
                          className="catalog__select-option"
                          onClick={() => handleSortFieldChange(option)}
                          tabIndex={0}
                          role="option"
                          onKeyDown={e =>
                            e.key === 'Enter' && handleSortFieldChange(option)
                          }
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </li>
                      ))}
                    </ul>
                  </label>

                  <label className="catalog__label" htmlFor="itemsPerPage">
                    Items on page
                    <div
                      id="itemsPerPage"
                      className="catalog__select"
                      role="button"
                      tabIndex={0}
                      onClick={e => {
                        e.stopPropagation();
                        toggleDropdown('itemsPerPage');
                      }}
                      onKeyDown={e =>
                        e.key === 'Enter' && toggleDropdown('itemsPerPage')
                      }
                    >
                      {itemsPerPage !== preparedProducts.length
                        ? itemsPerPage
                        : 'all'}

                      {isItemsDropdownOpen ? (
                        <Icon iconName="icon-arrow-up" />
                      ) : (
                        <Icon iconName="icon-arrow-down" />
                      )}
                    </div>
                    <ul
                      className={classNames('catalog__select-options', {
                        'catalog__select-options--active': isItemsDropdownOpen,
                      })}
                      role="listbox"
                    >
                      {itemsPerPageOptions.map(option => (
                        <li
                          key={option}
                          className="catalog__select-option"
                          onClick={() => handleItemsPerPageChange(option)}
                          tabIndex={0}
                          role="option"
                          onKeyDown={e =>
                            e.key === 'Enter' &&
                            handleItemsPerPageChange(option)
                          }
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </label>
                </div>

                {preparedProducts.length > 0 ? (
                  <>
                    <ProductsList
                      className="catalog__products-list"
                      products={itemNumbers}
                    />

                    {itemsPerPage !== preparedProducts.length && (
                      <Pagination
                        total={preparedProducts.length}
                        perPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={page => handlePageChange(page)}
                      />
                    )}
                  </>
                ) : (
                  <Notification
                    notification={`There are no ${type} matching the query`}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
