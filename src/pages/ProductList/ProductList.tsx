import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import React from 'react';

import { Products } from '../../types/Alltypes';
import { Category } from '../../types/Alltypes';
import { getData } from '../../fetch/httpClient';
import styles from './ProductList.module.scss';
import { ProductCarts } from '../../Functional/ProductCart/ProductCarts';
import { getSearchWith } from '../../getSearchWith';

type Props = {
  product?: Products[];
  title?: boolean;
};

export const ProductList: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams<{ category: string }>();

  const [item, setItem] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sortType = searchParams.get('sort') || 'age';
  const page = +(searchParams.get('page') || 1);
  const perPageParam = searchParams.get('perPage') || 'all';

  const perPage = perPageParam === 'all' ? item.length : +perPageParam;

  // slice //
  const startIndex = (page - 1) * perPage;
  const lastIndex = startIndex + perPage;

  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchWith({ sort: event.target.value });
  }

  function handlePerPageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchWith({ perPage: event.target.value, page: 1 });
  }

  function handlePageChange(newPage: number) {
    setSearchWith({ page: newPage });
  }

  const getSortedPhones = () => {
    const sorted = [...item];

    switch (sortType) {
      case 'age':
        return sorted.sort((a, b) => b.year - a.year);
      case 'title':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  };

  const sortedPhones = getSortedPhones();
  const totalPages = Math.ceil(sortedPhones.length / perPage);
  const displayedPhones = sortedPhones.slice(startIndex, lastIndex);

  useEffect(() => {
    getData<Products[]>('./api/products.json')
      .then(data =>
        setItem(data.filter(product => product.category === category)),
      )
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, [category, item.length, perPageParam, sortType, page, searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error} <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.containerPhones}>
      <Link to="/" className={styles.home}>
        <button className={styles.homeButton}>
          <img src="/img/home.svg" alt="home" className={styles.homeImg} />
          <span className={styles.homeGo}>{'>'}</span>
          <span className={styles.homeGoTo}>Phones</span>
        </button>
      </Link>

      <div className={styles.phonesProduct}>
        <h1 className={styles.name}>{category}</h1>
        <p className={styles.phonesModels}>{item.length} Models</p>
      </div>

      <div className={styles.dropdown}>
        <div className={styles.bySortedDropdown}>
          <p className={styles.bySorted}>Sort by</p>
          <select
            className={styles.selectSort}
            value={sortType}
            onChange={handleSortChange}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles.byFiltereDropdown}>
          <div className={styles.byItems}>Items on page</div>
          <select
            className={styles.selectFiltre}
            value={perPageParam}
            onChange={handlePerPageChange}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className={styles.catalogGrid}>
        {displayedPhones.map(phone => (
          <div key={phone.itemId} className={styles.gridItem}>
            <ProductCarts product={phone} />
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <img src="/img/vectorLeft.svg" alt="prev" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            disabled={page >= totalPages}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          <img src="/img/vectorRight.svg" alt="next" />
        </button>
      </div>
    </div>
  );
};
