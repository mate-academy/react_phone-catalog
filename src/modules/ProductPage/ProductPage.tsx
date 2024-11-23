import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProducts } from '../../redux/features/productsSlice';
import style from './ProductPage.module.scss';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import Title from '../../components/Title';
import Loader from '../../components/Loader';
import { categoriesMap } from '../../utils/categoriesMap';
import { Link, useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';

type Props = {
  category: string;
};

const ProductPage: React.FC<Props> = ({ category }) => {
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useAppDispatch();
  const { products, error, loading } = useAppSelector(state => state.products);
  const titleCategory = category[0].toUpperCase() + category.slice(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '-year';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = searchParams.get('perPage') || '8';
  const query = searchParams.get('query') || '';

  const limit =
    itemsPerPage === 'All' ? products.length : parseInt(itemsPerPage, 10);

  const startIndex = (page - 1) * limit;
  const endIndex =
    itemsPerPage === 'All' ? products.length : startIndex + limit;

  const displayedProducts =
    itemsPerPage === 'All' ? products : products.slice(startIndex, endIndex);

  const handleChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sort: event.target.value,
      page: '1',
    });
  };

  const handleChangeItemsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      perPage: event.target.value,
      page: '1',
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: newPage.toString(),
    });
  };

  const [debounceQuery, setDebounceQuery] = useState(query);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFetchProducts = useCallback(
    debounce((searchVal: string) => {
      setDebounceQuery(searchVal);
    }, 1000),
    [],
  );

  const handleChangeSearchValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    setSearchValue(value);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      query: value,
      page: '1',
    });
    debounceFetchProducts(value);
  };

  const handleClearSearchValue = () => {
    setSearchValue('');
    setSearchParams({
      ...Object.fromEntries(searchParams),
      query: '',
      page: '1',
    });
    debounceFetchProducts('');
  };

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  useEffect(() => {
    dispatch(fetchProducts({ category, sortBy, query: debounceQuery }));
  }, [dispatch, category, sortBy, debounceQuery]);

  useEffect(() => {
    return () => {
      debounceFetchProducts.cancel();
    };
  }, [debounceFetchProducts]);

  const showSortCategories = categoriesMap.map(cat => (
    <option value={cat.sort} className={style.option} key={cat.id}>
      {cat.title}
    </option>
  ));

  const showProducts = displayedProducts.map(item => (
    <ProductCard key={item.id} product={item} />
  ));

  return (
    <section className={style.page}>
      <div className="container">
        <div className={style.path}>
          <Link to="/" className={style.pathHome}>
            <img src="/img/icons/home.svg" alt="Home" />
          </Link>
          <img
            className={style.pathArrow}
            src="/img/icons/arrow-right.svg"
            alt="Arrow"
          />
          <Link to={`/${category}`} className={style.pathText}>
            {titleCategory}
          </Link>
        </div>

        <Title text={titleCategory} />

        <h4 className={style.subtitle}>{products.length} models</h4>

        <div className={style.filter}>
          <div className={style.dropdown}>
            <label htmlFor="sort" className={style.label}>
              Sort by
            </label>
            <select
              name="sort"
              id="sort"
              className={style.select}
              value={sortBy}
              onChange={handleChangeSortBy}
            >
              {showSortCategories}
            </select>
          </div>

          <div className={style.dropdown}>
            <label htmlFor="page" className={style.label}>
              Items on page
            </label>
            <select
              name="page"
              id="page"
              className={style.select}
              value={itemsPerPage}
              onChange={handleChangeItemsPerPage}
            >
              <option value="All" className={style.option}>
                All
              </option>
              <option value="4" className={style.option}>
                4
              </option>
              <option value="8" className={style.option}>
                8
              </option>
              <option value="16" className={style.option}>
                16
              </option>
            </select>
          </div>

          <div className={style.dropdown}>
            <label htmlFor="page" className={style.label}>
              Search
            </label>
            <input
              type="text"
              className={style.search}
              placeholder={`Search in ${category}`}
              value={searchValue}
              onChange={handleChangeSearchValue}
            />
            <div className={style.btns}>
              {searchValue ? (
                <button onClick={handleClearSearchValue}>
                  <img src="/img/icons/close.svg" alt="" />
                </button>
              ) : (
                <img src="/img/icons/search.svg" alt="" />
              )}
            </div>
          </div>
        </div>

        {loading && !error && <Loader />}

        {!loading && error && <h2>Error...</h2>}

        {!loading && !error && showProducts.length === 0 && (
          <h2>There are no {category} yet</h2>
        )}

        {!loading && !error && showProducts.length > 0 && (
          <>
            <div className={style.products}>{showProducts}</div>

            {itemsPerPage !== 'All' && (
              <Pagination
                totalPages={Math.ceil(products.length / limit)}
                currentPage={page}
                handlePageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductPage;
