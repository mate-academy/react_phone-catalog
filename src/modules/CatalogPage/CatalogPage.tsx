import style from './CatalogPage.module.scss';
import { Dropdown } from '../../components/Dropdown';
import { ProductCard } from '../../components/ProductCard';
import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductContext } from '../../store/ProductProvider';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { getSortedList } from '../../utils/getSortedList';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
};

export const CatalogPage: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loader, errorMessage } = useContext(ProductContext);
  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');
  const query = searchParams.get('query');

  const [currentPage, setCurrentPage] = useState(1);
  const [visibleList, setVisibleList] = useState<Product[]>([]);

  const navigate = useNavigate();

  const correctPerPage = perPage ? +perPage : 20; // используй 20 по умолчанию

  useEffect(() => {
    const sortedList = getSortedList(products, sort).filter(item => {
      const matchesCategory = item.category === category;
      const matchesQuery = query
        ? item.name.toLowerCase().includes(query.toLowerCase())
        : true;

      return matchesCategory && matchesQuery;
    });

    setVisibleList(sortedList);
    setCurrentPage(1);
  }, [category, perPage, sort, products, query]);

  const handleChangePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (nextPage === 1) {
      params.delete('page');
    } else {
      params.set('page', nextPage.toString());
    }

    setCurrentPage(nextPage);
    setSearchParams(params);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value) {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  return (
    <div className={style.catalogPage}>
      <div className={style.breadcrumbs}>
        <Breadcrumbs />
      </div>

      {loader && <Loader />}

      {errorMessage && !loader && (
        <div className={style.error}>
          <span className={style.error__text}>Something went wrong</span>
          <button
            type="button"
            className={style.error__button}
            onClick={() => navigate('/home')}
          >
            Go to home page
          </button>
        </div>
      )}

      {!!products.length && !loader && !errorMessage && (
        <>
          <h1 className={style.title}>
            {category === 'phones' ? 'mobile phones' : category}
          </h1>
          <p className={style.countModels}>{visibleList.length} models</p>

          <div className={`${style.sortField} ${style['sortField--1']}`}>
            <Dropdown dropdownName={'sort'} />
          </div>

          <div className={`${style.sortField} ${style['sortField--2']}`}>
            <Dropdown dropdownName={'perPage'} />
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
                (currentPage - 1) * correctPerPage,
                currentPage * correctPerPage,
              )
              .map(prod => (
                <li key={prod.id} className={style.card}>
                  <ProductCard prod={prod} />
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

      {!visibleList.length && !loader && !errorMessage && (
        <h1 className={style.noData}>There are no {category} yet</h1>
      )}
    </div>
  );
};
