import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SORTBY } from '../../constants/sortBy';
import { Card } from '../Card';
import { Pagination } from '../Pagination';
import { ONPAGE } from '../../constants/onPage';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';
import { Loader } from '../Loader';
import { Product } from '../../types/Product';
import { getProductsByCategoryWithDelay } from '../../api';

type Props = {
  category: string;
};

export const ProductPage: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || 'all';

  const [allGoods, setAllGoods] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('Newest');
  const [isSortList, setIsSortList] = useState(false);
  const [isCountItem, setIsCountItem] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState('');

  const startGood = +perPage * (+page - 1) + 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlerCurrentPage = (newPage: string) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === '1') {
      params.delete('page');
    } else {
      params.set('page', newPage);
    }

    setSearchParams(params);
  };

  const handlerPerPage = (newPerPage: string) => {
    const params = new URLSearchParams(searchParams);

    if (newPerPage === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', newPerPage);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const handlerSortBy = (newSort: string) => {
    const params = new URLSearchParams(searchParams);

    switch (newSort) {
      case 'Newest':
        params.set('sort', 'age');
        break;
      case 'Alphabetically':
        params.set('sort', 'title');
        break;
      case 'Cheapest':
        params.set('sort', 'price');
        break;
      default:
        params.delete('sort');
    }

    setSearchParams(params);
  };

  const handlerSelectIsSort = () => {
    setIsSortList(!isSortList);
  };

  const handlerSelectCount = () => {
    setIsCountItem(!isCountItem);
  };

  const handlerReloadModels = useCallback(() => {
    setIsLoad(true);
    setError('');

    getProductsByCategoryWithDelay(category.toLowerCase())
      .then(modelsFromServer => {
        if (modelsFromServer.length === 0) {
          setError(`There are no ${category.toLowerCase()} yet`);

          return;
        }

        setAllGoods(modelsFromServer);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, [category]);

  useEffect(() => {
    handlerReloadModels();
  }, [category, handlerReloadModels]);

  const visibleGoods = useMemo(() => {
    const preparedGoods = [...allGoods].sort((good1, good2) => {
      switch (sort) {
        case 'age':
          return good2.year - good1.year;
        case 'title':
          return good1.name.localeCompare(good2.name);
        case 'price':
          return good1.price - good2.price;
        default:
          return 0;
      }
    });

    setIsLoad(false);

    return perPage === 'all' || +perPage >= preparedGoods.length
      ? preparedGoods
      : preparedGoods.splice(startGood - 1, +perPage);
  }, [sort, perPage, startGood, allGoods]);

  useEffect(() => {
    switch (sort) {
      case 'age':
        setSortBy('Newest');
        break;
      case 'title':
        setSortBy('Alphabetically');
        break;
      case 'price':
        setSortBy('Cheapest');
        break;
      default:
        setSortBy('');
    }
  }, [sort]);

  const title = category !== 'Phones' ? category : 'Mobile phones';

  return (
    <>
      <h1 className="page__main-title">{category}</h1>
      <BreadCrumbs category={category} />

      <div className="page__container">
        <div className="page__category goods">
          <div className="goods__top">
            <h2 className="goods__title">{title}</h2>
            <p className="goods__count-items">{`${allGoods.length} models`}</p>
            <div className="goods__sortBy">
              <p className="goods__select-name">Sort by</p>
              <div
                className={classNames('goods__custom-select', {
                  'goods__custom-select--active': isSortList,
                })}
              >
                <input
                  value={sortBy}
                  type="button"
                  onChange={() => {}}
                  onClick={handlerSelectIsSort}
                  onBlur={() => setTimeout(() => setIsSortList(false), 100)}
                  className={classNames('goods__select', {
                    'goods__select--focus': isSortList,
                  })}
                />
                {isSortList && (
                  <ul className="goods__sort-list">
                    {SORTBY.map(value => (
                      <li
                        key={value}
                        className="goods__sort-item"
                        onClick={() => handlerSortBy(value)}
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="goods__sortBy goods__sortBy--onPage">
              <p className="goods__select-name">Items on page</p>
              <div
                className={classNames('goods__custom-select', {
                  'goods__custom-select--active': isCountItem,
                })}
              >
                <input
                  value={perPage}
                  type="button"
                  onChange={() => {}}
                  onClick={handlerSelectCount}
                  onBlur={() => {
                    setTimeout(() => setIsCountItem(false), 200);
                  }}
                  className={classNames('goods__select', {
                    'goods__select--focus': isCountItem,
                  })}
                />
                {isCountItem && (
                  <ul className="goods__sort-list">
                    {ONPAGE.map(value => (
                      <li
                        key={value}
                        className="goods__sort-item"
                        onClick={() => handlerPerPage(value)}
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          {isLoad ? (
            <Loader />
          ) : (
            <>
              {error ? (
                <div className="goods__error">
                  <p>{error}</p>
                  {error === 'Something went wrong' && (
                    <div
                      className="goods__error-link"
                      onClick={handlerReloadModels}
                    >
                      reload
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="goods__list">
                    {visibleGoods.map(phone => (
                      <div className="goods__item" key={phone.id}>
                        <Card model={phone} />
                      </div>
                    ))}
                  </div>
                  {perPage !== 'all' && +perPage < allGoods.length && (
                    <Pagination
                      total={allGoods.length}
                      perPage={perPage}
                      currentPage={+page}
                      onPageChange={handlerCurrentPage}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
