import { useContext, useState } from 'react';
import './Phones.scss';
import { DevicesContext } from '../../DevicesContext';
import { ProductCard } from '../ProductCard/ProductCard';
import homeIcon from '../../images/icons/home-icon.png';
import arrowRight from '../../images/icons/arrow-right.png';
import vector from '../../images/icons/vector.png';
import buttonLeft from '../../images/icons/button-left.png';
import buttonRight from '../../images/icons/button-right.png';
import classNames from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ItemCard } from '../ItemCard/ItemCard';
import { SortType } from '../../types/SortType';
import { SortVisibleItems } from '../../types/SortVisibleItems';

export const Phones = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const context = useContext(DevicesContext);
  const { pathname } = useLocation();
  const basePath = pathname.split('/').slice(1);

  const [visibleItems, setVisibleItems] = useState<'all' | '4' | '8' | '16'>(
    (searchParams.get('perPage') as SortVisibleItems) || 'all',
  );

  const visibleItemsOptions = [
    { value: 'all', label: 'All' },
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
  ];
  const [openSortByVisible, setOpenSortByVisible] = useState(false);

  const [sortBy, setSortBy] = useState<
    'newest' | 'alphabetically' | 'cheapest'
  >((searchParams.get('sort') as SortType) || 'newest');

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'alphabetically', label: 'Alphabetically' },
    { value: 'cheapest', label: 'Cheapest' },
  ];
  const [openSort, setOpenSort] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const updateSearchParams = (params: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      const isDefault =
        (key === 'sort' && value === 'newest') ||
        (key === 'page' && value === '1') ||
        (key === 'perPage' && value === 'all');

      if (isDefault) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    setSearchParams(newParams);
  };

  if (!context) {
    return null;
  }

  const { phones } = context;

  const sortedPhones = [...phones].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        const numA = Number(a.namespaceId.replace('x', '10').match(/\d+/));
        const numB = Number(b.namespaceId.replace('x', '10').match(/\d+/));

        return numB - numA;

      case 'alphabetically':
        return a.name.localeCompare(b.name);

      case 'cheapest':
        return a.priceDiscount - b.priceDiscount;

      default:
        return 0;
    }
  });

  const getItemsPerPage = () => {
    if (visibleItems === 'all') {
      return sortedPhones.length;
    }

    return Number(visibleItems);
  };

  const totalPages = Math.ceil(sortedPhones.length / getItemsPerPage());
  const buttonNumber = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getListOfPage = () => {
    let visibleButtonNumber: (string | number)[] = [];

    if (page > 4 && page < buttonNumber.length - 3) {
      visibleButtonNumber = [
        1,
        '...',
        page - 1,
        page,
        page + 1,
        '...',
        buttonNumber.length,
      ];
    } else if (page <= 4) {
      visibleButtonNumber = [1, 2, 3, 4, 5, '...', buttonNumber.length];
    } else if (page >= buttonNumber.length - 3) {
      visibleButtonNumber = [
        1,
        '...',
        buttonNumber.length - 4,
        buttonNumber.length - 3,
        buttonNumber.length - 2,
        buttonNumber.length - 1,
        buttonNumber.length,
      ];
    }

    return visibleButtonNumber;
  };

  return !basePath[1] ? (
    <div className="phones">
      <div className="phones__adress">
        <Link to={'/'} className="phones__adress__home-icon">
          <img src={homeIcon} className="phones__adress__home-icon__image" />
        </Link>

        <div className="phones__adress__arrow-right-icon">
          <img
            src={arrowRight}
            className="phones__adress__arrow-right-icon__image"
          />
        </div>

        <div className="phones__adress__page-adress">Phones</div>
      </div>

      <div className="phones__title">Mobile phones</div>

      <div className="phones__quantity-of-phones">{`${phones.length} models`}</div>

      <div className="phones__sort">
        <div className="phones__sort__container sort-by">
          <div className="phones__sort__name">Sort by</div>

          <div
            className="phones__sort__select"
            onClick={() => setOpenSort(!openSort)}
          >
            <div className="phones__sort__select__value">
              {sortOptions.find(o => o.value === sortBy)?.label}
            </div>

            <div className="phones__sort__select__vector">
              <img
                src={vector}
                className="phones__sort__select__vector__image"
              />
            </div>

            {openSort && (
              <ul className="phones__sort__dropdown">
                {sortOptions.map(o => (
                  <li
                    key={o.value}
                    className="phones__sort__dropdown__item"
                    onClick={() => {
                      setSortBy(o.value as SortType);
                      updateSearchParams({ sort: o.value, page: '1' });
                      setPage(1);
                      setOpenSort(false);
                    }}
                  >
                    {o.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="phones__sort__container items-on-page">
          <div className="phones__sort__name">Items on page</div>

          <div
            className="phones__sort__select"
            onClick={() => setOpenSortByVisible(!openSortByVisible)}
          >
            <div className="phones__sort__select__number">
              {visibleItemsOptions.find(o => o.value === visibleItems)?.label}
            </div>

            <div className="phones__sort__select__vector">
              <img
                src={vector}
                className="phones__sort__select__vector__image"
              />
            </div>

            {openSortByVisible && (
              <ul className="phones__sort__dropdown">
                {visibleItemsOptions.map(o => (
                  <li
                    key={o.value}
                    className="phones__sort__dropdown__item"
                    onClick={() => {
                      setVisibleItems(o.value as SortVisibleItems);
                      updateSearchParams({ perPage: o.value, page: '1' });
                      setPage(1);
                      setOpenSortByVisible(false);
                    }}
                  >
                    {o.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="phones__goods">
        {visibleItems === 'all'
          ? sortedPhones.map(model => (
              <ProductCard model={model} key={model.id} />
            ))
          : sortedPhones
              .slice(getItemsPerPage() * (page - 1), getItemsPerPage() * page)
              .map(model => <ProductCard model={model} key={model.id} />)}
      </div>

      {visibleItems !== 'all' && (
        <div className="phones__pagination">
          <button
            onClick={() => {
              setPage(page - 1);
              updateSearchParams({ page: `${String(page - 1)}` });
            }}
            className="phones__pagination__button-left"
            disabled={page === 1}
          >
            <img
              src={buttonLeft}
              className="phones__pagination__button-left__image"
            />
          </button>

          <div className="phones__pagination__button-numbers">
            {buttonNumber.length <= 7
              ? buttonNumber.map(num => (
                  <div
                    onClick={() => {
                      setPage(+num);
                      updateSearchParams({ page: String(num) });
                    }}
                    className={classNames('phones__pagination__button-number', {
                      'phones__pagination__button-number--active': num === page,
                    })}
                    key={num}
                  >
                    {num}
                  </div>
                ))
              : getListOfPage().map((num, ind) =>
                  typeof num === 'number' ? (
                    <div
                      onClick={() => {
                        setPage(+num);
                        updateSearchParams({ page: String(num) });
                      }}
                      className={classNames(
                        'phones__pagination__button-number',
                        {
                          'phones__pagination__button-number--active':
                            num === page,
                        },
                      )}
                      key={ind}
                    >
                      {num}
                    </div>
                  ) : (
                    <div className="phones__pagination__ellipsis" key={ind}>
                      {num}
                    </div>
                  ),
                )}
          </div>

          <button
            onClick={() => {
              setPage(page + 1);
              updateSearchParams({ page: `${String(page + 1)}` });
            }}
            className="phones__pagination__button-right"
            disabled={page === buttonNumber.length}
          >
            <img
              src={buttonRight}
              className="phones__pagination__button-right__image"
            />
          </button>
        </div>
      )}
    </div>
  ) : (
    <ItemCard />
  );
};
