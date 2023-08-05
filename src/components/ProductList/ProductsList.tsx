import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../type/Product';
import CustomSelect from '../CustomSelect';
import { getProducts } from '../../server/fetchJson';
import Card from '../Card';
import { useAppSelector } from '../../app/hooks';
import { favoriteItems } from '../../app/store';
import './ProductsList.scss';
import Loader from '../Loader';

type Props = {
  query: string;
};

const itemsPageArr = ['8', '16', '32', '64', 'All'];
const sortArr = ['Newest', 'Alphabetically', 'Low price', 'High price'];

export const ProductsList: React.FC<Props> = ({ query }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [selectSortCount, setSelectSortCount] = useState(false);
  const [selectSortValue, setSelectSortValue] = useState(false);
  const [loader, setLoader] = useState(true);

  const [items, setItems] = useState<Product[]>([]);
  const [visibleProd, setVisibleProd] = useState<Product[]>([]);

  const { favoriteItem } = useAppSelector(favoriteItems);

  const perPage = searchParams.get('per_page') || '8';
  const sort = searchParams.get('sort') || 'Choose';
  const page = searchParams.get('page') || '1';

  const OnBlurCount = () => {
    setSelectSortCount(false);
  };

  const handOnClickCount = () => {
    setSelectSortCount(true);
  };

  const onKeyDownSortCount = (
    e: React.KeyboardEvent<HTMLLIElement>,
    value: string,
  ) => {
    if (e.key === 'Enter') {
      searchParams.set('per_page', value);
      setSearchParams(searchParams);
      setSelectSortCount(false);
    }
  };

  const chooseValueSortCount = (item: string) => {
    searchParams.set('per_page', item);
    setSearchParams(searchParams);
    setSelectSortCount(false);
  };

  const onBlurLastItemCount = (itemsArr: string[], item: string) => {
    if (itemsArr[itemsArr.length - 1] === item) {
      setSelectSortCount(false);
    }
  };

  const handOnClickSort = () => {
    setSelectSortValue(true);
  };

  const onBlurSort = () => {
    setSelectSortValue(false);
  };

  const onKeyDownSortValue = (
    e: React.KeyboardEvent<HTMLLIElement>,
    value: string,
  ) => {
    if (e.key === 'Enter') {
      searchParams.set('sort', value);
      setSearchParams(searchParams);
      setSelectSortValue(false);
    }
  };

  const chooseValueSortValue = (item: string) => {
    searchParams.set('sort', item);
    setSearchParams(searchParams);
    setSelectSortValue(false);
  };

  const onBlurLastItemValue = (itemsArr: string[], item: string) => {
    if (itemsArr[itemsArr.length - 1] === item) {
      setSelectSortValue(false);
    }
  };

  const pageArr: number[] = [];

  for (let i = 1; i <= Math.ceil(items.length / +perPage); i += 1) {
    pageArr.push(i);
  }

  const sortVisibleProd = () => {
    const cloneP = [...items];
    const filterProduct = cloneP
      .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

    const sortedProducts = filterProduct.sort((p1, p2) => {
      switch (sort.toLowerCase()) {
        case 'newest':
          return p2.age - p1.age;
        case 'alphabetically':
          return p1.name.localeCompare(p2.name);
        case 'low price':
          return p1.price - p2.price;
        case 'high price':
          return p2.price - p1.price;
        default:
          return 0;
      }
    });

    const visiblePageProduct = () => {
      if (perPage === 'All') {
        return sortedProducts;
      }

      const r = [...sortedProducts];

      return r.splice((+page - 1) * +perPage, +perPage);
    };

    setVisibleProd(visiblePageProduct());
  };

  const nexPage = () => {
    if (!(+page === Math.ceil(items.length / +perPage))) {
      searchParams.set('page', String(+page + 1));
      setSearchParams(searchParams);
    }
  };

  const prevPage = () => {
    if (!(+page === 1)) {
      searchParams.set('page', String(+page - 1));
      setSearchParams(searchParams);
    }
  };

  const firstLocation = location.pathname.split('/').filter((l) => l !== '')[0];
  const typeProduct = firstLocation.slice(0, -1);

  useEffect(() => {
    if (firstLocation !== 'favorites') {
      setLoader(true);
      getProducts()
        .then(prod => {
          setLoader(false);
          setItems(prod
            .filter(item => item.type === typeProduct));
        })
        .catch(() => setLoader(false));
    } else {
      setItems(favoriteItem);
    }
  }, [firstLocation, favoriteItem]);

  useEffect(() => {
    sortVisibleProd();
  }, [items, query, page, sort, perPage]);

  useEffect(() => {
    searchParams.delete('page');
    setSearchParams(searchParams);
  }, [sort, perPage]);

  const pageTitle = () => {
    switch (firstLocation) {
      case 'phones':
        return 'Mobiel phones';

      case 'tablets':
        return 'Tablets';

      case 'accessories':
        return 'Accessories';

      case 'favorites':
        return 'Favorites';

      default:
        return '';
    }
  };

  if (loader && firstLocation !== 'favorites') {
    return (
      <Loader />
    );
  }

  return (
    <>
      <div className="breadcrumbs">
        <Link to="/home" className="breadcrumbs__home" />
        <span className="breadcrumbs__arrow" />
        <Link to={{ pathname: `../${firstLocation}` }} className="breadcrumbs__location">
          {firstLocation.slice(0, 1).toUpperCase() + firstLocation.slice(1)}
        </Link>
      </div>
      {visibleProd.length > 0 ? (
        <>
          <h1 className="page__title">
            {pageTitle()}
          </h1>

          <span className="page__count page__count--margin">
            {`${items.length} models`}
          </span>

          <div className="page__filter">
            <div className="filter__wrapper">
              <span className="filter__title">Sort by</span>

              <CustomSelect
                value={sort}
                isSelect={selectSortValue}
                handleActiveSelect={handOnClickSort}
                handleOnKeyDown={onKeyDownSortValue}
                handleChooseValue={chooseValueSortValue}
                listItems={sortArr}
                onBlurFromLastItem={onBlurLastItemValue}
                onBlurBlock={onBlurSort}
              />
            </div>

            <div className="filter__wrapper">
              <span className="filter__title">Items on page</span>

              <CustomSelect
                value={perPage}
                isSelect={selectSortCount}
                handleActiveSelect={handOnClickCount}
                handleOnKeyDown={onKeyDownSortCount}
                handleChooseValue={chooseValueSortCount}
                listItems={itemsPageArr}
                onBlurFromLastItem={onBlurLastItemCount}
                onBlurBlock={OnBlurCount}
              />
            </div>
          </div>
          <div className="page__mobiel">
            <ul className="card__list page__list" data-cy="cardContainer">
              {visibleProd.map((prod) => (
                <Card product={prod} key={prod.id} />
              ))}
            </ul>
          </div>
          {perPage !== 'All' && +perPage < items.length && (
            <div className="mobiel__pagination pagination">
              <ul className="pagination__list">
                <li className="pagination__item">
                  <button
                    className="pagination__link pagination__link-prev"
                    onClick={prevPage}
                    type="button"
                    aria-label="prev-btn"
                  />
                </li>
                {pageArr.map((p) => (
                  <li className="pagination__item" key={p}>
                    <button
                      className={classNames(
                        'pagination__link',
                        { active: +page === p },
                      )}
                      onClick={() => {
                        searchParams.set('page', String(p));
                        setSearchParams(searchParams);
                      }}
                      type="button"
                      aria-label="page-btn"
                    >
                      {p}
                    </button>
                  </li>
                ))}
                <li className="pagination__item">
                  <button
                    className="pagination__link pagination__link-next"
                    onClick={nexPage}
                    type="button"
                    aria-label="next-btn"
                  />
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <h1 className="page__title">Product not found</h1>
      )}
    </>
  );
};
