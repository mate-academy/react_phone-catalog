import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductsList } from '../../components/ProductsList';
import { AppContext } from '../../context/AppContext';
import { getPhones } from '../../helpers/products';
import { Product } from '../../types/Product';
import { Sort } from '../../types/Sort';
import { getSearchWith } from '../../helpers/getSearchWith';
import { NoSearchResults } from '../../components/NoSearchResults';
import './PhonesPage.scss';
import { Category } from '../../types/Category';

type Dropdown = 'sort' | 'perPage' | null;

const sortOptions: Sort = {
  Newest: 'age',
  Alphabetically: 'name',
  Cheapest: 'price',
};
const itemsCountOptions = ['4', '8', '16', 'All'];

export const PhonesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { phonesCount } = useContext(AppContext);

  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<Dropdown>(null);

  const page = +(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || 8;
  const sortBy = searchParams.get('sort') || 'age';
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setIsLoading(true);

    getPhones()
      .then(setPhones)
      .catch(() => {
        // setErrorMessage('Error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getVisiblePhones = useCallback(() => {
    let currentPhones = [...phones];

    switch (sortBy) {
      case sortOptions.Alphabetically:
        currentPhones = currentPhones.sort((phone1, phone2) => {
          return phone1.name.localeCompare(phone2.name);
        });
        break;

      case sortOptions.Cheapest:
        currentPhones = currentPhones.sort((phone1, phone2) => {
          return phone1.price - phone2.price;
        });
        break;

      case sortOptions.Newest:
        currentPhones = currentPhones
          .sort((phone1, phone2) => phone2.year - phone1.year)
          .sort((item1, item2) => item2.price - item1.price);
        break;

      default:
        return currentPhones;
    }

    if (query) {
      currentPhones = currentPhones.filter(phone => {
        return phone.name.toLowerCase()
          .includes(query.toLowerCase());
      });
    }

    return currentPhones;
  }, [phones, query, sortBy]);

  const visiblePhones = getVisiblePhones();
  const numberOfPages = Math.ceil(visiblePhones.length / +perPage) || 1;

  const firstItem = (page - 1) * +perPage;
  const lastItem = page * +perPage < visiblePhones.length
    ? page * +perPage
    : visiblePhones.length;

  const handleDropdownClick = (value: Dropdown) => {
    setActiveDropdown(value === activeDropdown
      ? null
      : value);
  };

  const handleBlur = () => {
    setActiveDropdown(null);
  };

  const getSelectedSort = () => {
    const currentSort = searchParams.get('sort');
    const selectedSort = Object.keys(sortOptions).find(option => {
      return sortOptions[option as keyof Sort] === currentSort;
    });

    return selectedSort || 'Newest';
  };

  return (
    <div className="PhonesPage">
      <div className="container">
        <div className="PhonesPage__content">
          <Breadcrumbs category={Category.phone} />

          <div className="PhonesPage__main-info">
            <h2 className="PhonesPage__title">
              Mobile phones
            </h2>
            <p className="PhonesPage__models-count">
              {query ? (
                `${visiblePhones.length} result${visiblePhones.length === 1 ? '' : 's'}`
              ) : (
                `${phonesCount}`
              )}
            </p>
          </div>

          {isLoading && !visiblePhones.length && !!query && (<Loader />)}

          {!visiblePhones.length && !isLoading && (
            <NoSearchResults />
          )}

          {!!visiblePhones.length && (
            <div className="PhonesPage__dropdowns">
              <div className="Dropdown">
                <p className="Dropdown__title">
                  Sort by
                </p>

                <div className="Dropdown__content">
                  <button
                    type="button"
                    className="button button--dropdown"
                    onClick={() => handleDropdownClick('sort')}
                    onBlur={handleBlur}
                  >
                    <p className="Dropdown__text">
                      {getSelectedSort()}
                    </p>
                    <div className={classNames('Dropdown__icon', {
                      'Dropdown__icon--active': activeDropdown === 'sort',
                    })}
                    />
                  </button>

                  <ul
                    className={classNames('Dropdown__list', {
                      'Dropdown__list--opened': activeDropdown === 'sort',
                    })}
                  >
                    {Object.entries(sortOptions).map(([key, value]) => (
                      <div key={value} className="Dropdown__item">
                        <Link
                          to={{
                            search: getSearchWith(
                              searchParams, {
                                sort: value,
                                page: '1',
                              },
                            ).toString(),
                          }}
                          className="Dropdown__link"
                        >
                          {key}
                        </Link>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="Dropdown">
                <p className="Dropdown__title">
                  Items on page
                </p>

                <div className="Dropdown__content">
                  <button
                    type="button"
                    className="button button--dropdown"
                    onClick={() => handleDropdownClick('perPage')}
                    onBlur={handleBlur}
                  >
                    <p className="button--dropdown-text">
                      {perPage.toString()}
                    </p>
                    <div className={classNames('Dropdown__icon', {
                      'Dropdown__icon--active': activeDropdown === 'perPage',
                    })}
                    />
                  </button>

                  <ul
                    className={classNames('Dropdown__list', {
                      'Dropdown__list--opened': activeDropdown === 'perPage',
                    })}
                  >
                    {itemsCountOptions.map((option) => (
                      <div key={option} className="Dropdown__item">
                        <Link
                          to={{
                            search: getSearchWith(
                              searchParams, {
                                perPage: option,
                                page: '1',
                              },
                            ).toString(),
                          }}
                          className="Dropdown__link"
                        >
                          {option}
                        </Link>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {!isLoading && !!visiblePhones.length && (
            <ProductsList products={visiblePhones.slice(firstItem, lastItem)} />
          )}

          {numberOfPages > 1 && perPage !== 'All' && (
            <Pagination pages={numberOfPages} />
          )}
        </div>
      </div>
    </div>
  );
};
