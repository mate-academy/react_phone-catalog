import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import style from './CatalogPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { init } from '../../features/products';
import { Product } from '../../types/Product';
import { getSortedList } from '../../services/getSortedList';
import { DropDown } from '../../components/DropDown';
import { ProductCart } from '../../components/ProductCart';
import { Pagination } from '../../components/Pagination';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
};

export const CatalogPage: React.FC<Props> = ({ category }) => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleList, setVisibleList] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const sort = searchParams.get('sort' || '');
  const perPage = searchParams.get('perPage' || '');
  const query = searchParams.get('query' || '');

  const navigate = useNavigate();
  const correctPerPage = perPage ? +perPage : visibleList.length;

  const { items, loading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    if (items.length === 0 && !loading) {
      dispatch(init());
    }
  }, [dispatch, items, loading]);

  useEffect(() => {
    const sortedList = getSortedList(items, sort).filter(item => {
      const matchesCategory = item.category === category;
      const matchesQuery = query
        ? item.name.toLowerCase().includes(query.toLowerCase())
        : true;

      return matchesCategory && matchesQuery;
    });

    setVisibleList(sortedList);
  }, [items, category, query, sort]);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (!e.target.value) {
      params.delete('query');
    } else {
      params.set('query', e.target.value);
    }

    setSearchParams(params);
  };

  const handleChangePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (nextPage === 1) {
      params.delete('page');
    } else {
      params.set('page', nextPage.toString());
    }

    setSearchParams(params);
    setCurrentPage(nextPage);
  };

  return (
    <div className={style.catalogPage}>
      <div className={style.breadcrumbs}>
        <Breadcrumbs name="Phones" />
      </div>

      {loading && <Loader />}

      {error && !loading && (
        <div className={style.error}>
          <span className={style.error__text}>There are no {category} yet</span>
          <button
            type="button"
            className={style.error__btn}
            onClick={() => navigate('/home')}
          >
            Go to home page
          </button>
        </div>
      )}

      {!!items.length && !loading && !error && (
        <>
          <h1 className={style.title}>
            {category === 'phones' ? 'Mobile phones' : category}
          </h1>

          <p className={style.countModels}>{visibleList.length} models</p>

          <div className={`${style.sortField} ${style['sortField--1']}`}>
            <DropDown dropDownName={'sort'} />
          </div>

          <div className={`${style.sortField} ${style['sortField--2']}`}>
            <DropDown dropDownName={'perPage'} />
          </div>

          <div className={style.query}>
            <label htmlFor="query" className={style.query__label}>
              Search
            </label>
            <input
              id="query"
              className={style.query__input}
              type="text"
              value={query || ''}
              onChange={handleQuery}
              placeholder="I want to find ..."
            />
          </div>

          <ul className={style.cards}>
            {visibleList
              .slice(
                currentPage * correctPerPage - correctPerPage,
                currentPage * correctPerPage,
              )
              .map(prod => (
                <li key={prod.id} className={style.card}>
                  <ProductCart product={prod} discount={true} />
                </li>
              ))}
          </ul>
          {correctPerPage < visibleList.length && (
            <div className={style.pagination}>
              <Pagination
                currentPage={currentPage}
                visibleList={visibleList}
                perPage={correctPerPage}
                onPageChange={handleChangePage}
              />
            </div>
          )}
        </>
      )}

      {!visibleList.length && !loading && !error && (
        <h1 className={style.noData}> There are no {category} yet</h1>
      )}
    </div>
  );
};
