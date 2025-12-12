import { useContext, useState } from 'react';
import './Tablets.scss';
import { DevicesContext } from '../../DevicesContext';
import { ProductCard } from '../ProductCard/ProductCard';
import classNames from 'classnames';
import homeIcon from '../../images/icons/home-icon.png';
import arrowRight from '../../images/icons/button-right.png';
import vector from '../../images/icons/vector.png';
import buttonLeft from '../../images/icons/button-left.png';
import buttonRight from '../../images/icons/button-right.png';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ItemCard } from '../ItemCard/ItemCard';
import { SortType } from '../../types/SortType';
import { Device } from '../../types/Device';
import { SortVisibleItems } from '../../types/SortVisibleItems';

export const Tablets = () => {
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

  const getReleaseYear = (device: Device): number => {
    const id = device.namespaceId;

    if (id.includes('4th-gen')) {
      return 2015;
    }

    if (id.includes('5th-gen')) {
      return 2019;
    }

    if (id.includes('6th-gen')) {
      return 2021;
    }

    const matches = id.match(/\d+/g);

    return matches ? Number(matches[matches.length - 1]) : 0;
  };

  const { tablets } = context;

  const sortedTablets = [...tablets].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return getReleaseYear(b) - getReleaseYear(a);

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
      return sortedTablets.length;
    }

    return Number(visibleItems);
  };

  const totalPages = Math.ceil(sortedTablets.length / getItemsPerPage());
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
    <div className="tablets">
      <div className="tablets__address">
        <Link to={'/'} className="tablets__address__home-icon">
          <img src={homeIcon} className="tablets__address__home-icon__image" />
        </Link>

        <div className="tablets__address__arrow-right-icon">
          <img
            src={arrowRight}
            className="tablets__address__arrow-right-icon__image"
          />
        </div>

        <div className="tablets__address__page-address">Tablets</div>
      </div>

      <div className="tablets__title">Tablets</div>

      <div className="tablets__quantity-of-phones">{`${tablets.length} models`}</div>

      <div className="tablets__sort">
        <div className="tablets__sort__container sort-by">
          <div className="tablets__sort__name">Sort by</div>

          <div
            className="tablets__sort__select"
            onClick={() => setOpenSort(!openSort)}
          >
            <div className="tablets__sort__select__value">
              {sortOptions.find(o => o.value === sortBy)?.label}
            </div>

            <div className="tablets__sort__select__vector">
              <img
                src={vector}
                className="tablets__sort__select__vector__image"
              />
            </div>

            {openSort && (
              <ul className="tablets__sort__dropdown">
                {sortOptions.map(o => (
                  <li
                    key={o.value}
                    className="tablets__sort__dropdown__item"
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

        <div className="tablets__sort__container items-on-page">
          <div className="tablets__sort__name">Items on page</div>

          <div
            className="tablets__sort__select"
            onClick={() => setOpenSortByVisible(!openSortByVisible)}
          >
            <div className="tablets__sort__select__number">
              {visibleItemsOptions.find(o => o.value === visibleItems)?.label}
            </div>

            <div className="tablets__sort__select__vector">
              <img
                src={vector}
                className="tablets__sort__select__vector__image"
              />
            </div>

            {openSortByVisible && (
              <ul className="tablets__sort__dropdown">
                {visibleItemsOptions.map(o => (
                  <li
                    key={o.value}
                    className="tablets__sort__dropdown__item"
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

      <div className="tablets__goods">
        {visibleItems === 'all'
          ? sortedTablets.map(model => (
              <ProductCard model={model} key={model.id} />
            ))
          : sortedTablets
              .slice(getItemsPerPage() * (page - 1), getItemsPerPage() * page)
              .map(model => <ProductCard model={model} key={model.id} />)}
      </div>

      {visibleItems !== 'all' && (
        <div className="tablets__pagination">
          <button
            onClick={() => {
              setPage(page - 1);
              updateSearchParams({ page: `${String(page - 1)}` });
            }}
            className="tablets__pagination__button-left"
            disabled={page === 1}
          >
            <img
              src={buttonLeft}
              className="tablets__pagination__button-left__image"
            />
          </button>

          <div className="tablets__pagination__button-numbers">
            {buttonNumber.length <= 7
              ? buttonNumber.map(num => (
                  <div
                    onClick={() => {
                      setPage(+num);
                      updateSearchParams({ page: String(num) });
                    }}
                    className={classNames(
                      'tablets__pagination__button-number',
                      {
                        'tablets__pagination__button-number--active':
                          num === page,
                      },
                    )}
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
                        'tablets__pagination__button-number',
                        {
                          'tablets__pagination__button-number--active':
                            num === page,
                        },
                      )}
                      key={ind}
                    >
                      {num}
                    </div>
                  ) : (
                    <div className="tablets__pagination__ellipsis" key={ind}>
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
            className="tablets__pagination__button-right"
            disabled={page === buttonNumber.length}
          >
            <img
              src={buttonRight}
              className="tablets__pagination__button-right__image"
            />
          </button>
        </div>
      )}
    </div>
  ) : (
    <ItemCard />
  );
};
