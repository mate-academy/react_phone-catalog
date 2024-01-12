import { useCallback, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { GlobalContext } from '../../components/Context/GlobalContext';
import { SortType } from '../../types/SortType';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { Loader } from '../../components/Loader/Loader';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Pagination } from '../../components/Pagination/Pagination';
import './PhonePage.scss';
import { ICONS } from '../../icons';

export const SORT: SortType = {
  NEWEST: 'Newest',
  ALPHABETICALLY: 'Alphabetically',
  CHEAPEST: 'Cheapest',
};

const sortingOptions = [
  { value: 'age', label: SORT.NEWEST },
  { value: 'name', label: SORT.ALPHABETICALLY },
  { value: 'price', label: SORT.CHEAPEST },
];

const itemsPerPageOptions = [
  { value: 'all', label: 'all' },
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
];

export const PhonePage = () => {
  const [searchParams] = useSearchParams();
  const {
    products, handlePerPageChange, setSortingOption, isLoading,
  } = useContext(GlobalContext);

  const page = +(searchParams.get('page') || 1);
  const phonesPerPage = searchParams.get('perPage') || 8;
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort') || 'age';

  const getVisiblePhones = useCallback(() => {
    let currentPhones = [...products];

    currentPhones = currentPhones.sort((phone1, phone2) => {
      switch (sortBy) {
        case SORT.ALPHABETICALLY:
          return phone1.name.localeCompare(phone2.name);

        case SORT.NEWEST:
          return phone1.year - phone2.year;

        case SORT.CHEAPEST:
          return phone1.price - phone2.price;

        default:
          return 0;
      }
    });

    if (query) {
      currentPhones = currentPhones.filter((phone) => {
        return phone.name.toLowerCase().includes(query.toLowerCase());
      });
    }

    return currentPhones;
  }, [products, query, sortBy]);

  const visiblePhones = getVisiblePhones();
  const numOfPages = Math.ceil(visiblePhones.length / +phonesPerPage) || 1;

  const firstProduct = (page - 1) * +phonesPerPage;
  const lastProduct = page * +phonesPerPage < visiblePhones.length
    ? page * +phonesPerPage
    : visiblePhones.length;

  return (
    <section className="phones">
      <div className="phones__container">
        <div className="phones__breadcrumbs">
          <BreadCrumbs page="Phones" />
        </div>

        {isLoading ? (
          <div className="loader">
            <Loader />
          </div>
        ) : (
          <>
            <div className="phones__info">
              <h1 className="phones__title">Mobile phones</h1>
              <span className="phones__count">
                {`${visiblePhones.length} phone${visiblePhones.length === 1 ? '' : 's'}`}
              </span>
            </div>

            {searchParams.toString().length ? (
              <div className="warning-message">
                <img 
                  src={ICONS.iconWarning} 
                  alt='warning' 
                  className="warning-message__image"
                />
                <h1 className="warning-message__text">
                  No search result
                </h1>
              </div>
            ) : (
              <>
                <div className="phones__dropdowns">
                  <div className="dropdown">
                    <span className="dropdown__title">Sort by</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortingOption(e.target.value)}
                      className="dropdown__sorting"
                    >
                      {sortingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="dropdown dropdown--items-per-page">
                    <span className="dropdown__title">Items on page</span>
                    <select
                      value={phonesPerPage}
                      onChange={handlePerPageChange}
                      className="dropdown__sorting dropdown__sorting--pages"
                    >
                      {itemsPerPageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={classNames('phones__list', {
                  'phones__list--with-margin': numOfPages === 1,
                })}>
                  <ProductsList
                    products={visiblePhones.slice(firstProduct, lastProduct)}
                  />
                </div>

                {numOfPages !== 1 && (
                  <div className="phones__pagination">
                    <Pagination total={numOfPages} />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};
