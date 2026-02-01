/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Pagination } from '../../components/Pagination/Pagination';
import { Product, ProductCategory } from '../../types/Product';
import { Link } from 'react-router-dom';
import { useQuery } from '../../utils/searchParams';
import { client } from '../../client';
import { Loader } from '../../components/Loader';
import style from './ProductPages.module.scss';
import { ProductList } from '../../components/ProductList/ProductList';

type Props = { category: ProductCategory };

export const ProductsPages: React.FC<Props> = ({ category }) => {
  const [{ sort = 'age', page = '1', perPage = '8', query = '' }, setQuery] =
    useQuery({ sort: 'age', page: '1', perPage: '8', query: '' });

  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    document.title = `${category[0].toUpperCase()}${category.slice(1)} page`;
    setLoading(true);
    setError(null);

    client
      .getProducts(category)
      .then(res => setData(res))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = useMemo(() => {
    if (!data) {
      return [];
    }

    const que = query.trim().toLowerCase();
    let list = data;

    if (que) {
      list = list.filter(p => p.name.toLowerCase().includes(que));
    }

    switch (sort) {
      case 'title':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'price':
        list = [...list].sort((a, b) => a.price - b.price);
        break;

      case 'age':
      default:
        list = [...list].sort((a, b) => a.year - b.year);
    }

    return list;
  }, [data, sort, query]);

  const currentPage = Math.max(1, Number(page) || 1);
  const perPageNumber =
    perPage === 'all' ? filtered.length : Math.max(1, Number(perPage) || 8);

  const from = (currentPage - 1) * perPageNumber;
  const to = from + perPageNumber;
  const pag = filtered.slice(from, to);

  const categoryTitles: Record<ProductCategory, string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
    products: '',
  };

  const title =
    categoryTitles[category] || category[0].toUpperCase() + category.slice(1);

  return (
    <div className={style.section}>
      <div className={style.topNav}>
        <Link to="/">
          <img
            src="/public/img/buttons/home_button.svg"
            alt="Link Home"
            className={style.imgHome}
          />
        </Link>
        <img src="/public/img/arrows/arrow_right_gray.svg" alt="button right" />
        <p className={style.category}>
          {category[0].toUpperCase() + category.slice(1)}
        </p>
      </div>

      <h2 className={style.mainTitleH}>{title}</h2>
      <p className={style.mainTitleM}>{data ? data.length : 0} modules</p>

      <div className={style.select}>
        <div>
          <p className={style.label}>Sort by</p>
          <select
            className={`${style.customSelect} ${style.leftselect}`}
            value={sort}
            onChange={e => setQuery({ sort: e.target.value, page: '1' })}
            title="Sort by"
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest </option>
          </select>
        </div>

        <div>
          <p className={style.label}>Items on page</p>
          <select
            className={`${style.customSelect} ${style.rightselect}`}
            value={perPage}
            onChange={e => setQuery({ perPage: e.target.value, page: '1' })}
            title="Items on page"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">all</option>
          </select>
        </div>
      </div>

      {loading && <Loader />}

      {error && !loading && (
        <div>
          <p>Something went wrong.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p>
          {query
            ? `There are no ${category} matching the query`
            : `There are no ${category} yet`}
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <ProductList products={pag} />

          <Pagination
            total={filtered.length}
            perPage={perPageNumber}
            currentPage={currentPage}
            onPageChange={p => setQuery({ page: String(p) })}
          />
        </>
      )}
    </div>
  );
};
