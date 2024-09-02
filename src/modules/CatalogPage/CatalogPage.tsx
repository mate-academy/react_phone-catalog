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

type Props = {
  type: string;
};

const prepareProducts = (products: ProductType[], sortField: string | null) => {
  const readyProducts = [...products];

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
  const [itemsPerPageValue, setItemsPerPageValue] = useState(
    searchParams.get('perPage') || '4',
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
    });
  };

  const handleItemsPerPageChange = (newItemsPerPage: string) => {
    setIsItemsDropdownOpen(false);
    setItemsPerPageValue(newItemsPerPage);

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
    });
  };

  const handlePageChange = (page: number) => {
    setIsSortDropdownOpen(false);
    setIsItemsDropdownOpen(false);
    setCurrentPage(page);

    setSearchParams({
      sort: sortField,
      perPage: searchParams.get('perPage') || '4',
      page: String(page),
    });
  };

  useEffect(() => {
    const sortParam = searchParams.get('sort');

    if (sortParam) {
      setSortField(sortParam);
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

    setPreparedProducts(prepareProducts(productList, sortField));
  }, [accessories, phones, products, searchParams, sortField, tablets, type]);

  return (
    <div className="catalog page">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className="container">
            <Breadcrumbs className="catalog__breadcrumbs" />

            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

            {preparedProducts?.length === 0 && !errorMessage && (
              <span className="notification">{`There are no ${type} yet`}</span>
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

                <span className="catalog__sub-text">{`${phones.length} models`}</span>

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
                    >
                      <div className="catalog__select-name">
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
                      >
                        <li
                          className="catalog__select-option"
                          onClick={() => handleSortFieldChange('newest')}
                        >
                          Newest
                        </li>
                        <li
                          className="catalog__select-option"
                          onClick={() => handleSortFieldChange('alphabet')}
                        >
                          Alphabetically
                        </li>
                        <li
                          className="catalog__select-option"
                          onClick={() => handleSortFieldChange('cheapest')}
                        >
                          Cheapest
                        </li>
                      </ul>
                    </div>
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
                    >
                      <div className="catalog__select-name">
                        {itemsPerPageValue}

                        {isItemsDropdownOpen ? (
                          <Icon iconName="icon-arrow-up" />
                        ) : (
                          <Icon iconName="icon-arrow-down" />
                        )}
                      </div>

                      <ul
                        className={classNames('catalog__select-options', {
                          'catalog__select-options--active':
                            isItemsDropdownOpen,
                        })}
                      >
                        <li
                          className="catalog__select-option"
                          onClick={() => handleItemsPerPageChange('4')}
                        >
                          4
                        </li>
                        <li
                          className="catalog__select-option"
                          onClick={() => handleItemsPerPageChange('8')}
                        >
                          8
                        </li>
                        <li
                          className="catalog__select-option"
                          onClick={() => handleItemsPerPageChange('16')}
                        >
                          16
                        </li>
                        <li
                          className="catalog__select-option"
                          onClick={() => handleItemsPerPageChange('all')}
                        >
                          all
                        </li>
                      </ul>
                    </div>
                  </label>
                </div>

                {preparedProducts && (
                  <>
                    <ProductsList
                      className="catalog__products-list"
                      products={itemNumbers}
                    />

                    {itemsPerPageValue !== 'all' && (
                      <Pagination
                        total={preparedProducts.length}
                        perPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={page => handlePageChange(page)}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
