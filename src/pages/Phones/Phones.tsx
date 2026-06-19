import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';

import { Products } from '../../types/Alltypes';
import { getData } from '../../fetch/httpClient';
import styles from './Phones.module.scss';
import { ProductCarts } from '../../Functional/ProductCart/ProductCarts';
import { getSearchWith } from '../../getSearchWith';

type Props = {
  phone?: Products[];
};

export const Phones: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [phones, setPhones] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const startIndex = (currentPage - 1) * perPage;
  const lastIndex = startIndex + perPage;

  const sortType = searchParams.get('sort') || 'age';
  // const page = +(searchParams.get('page') || 1);
  // const perPageParam = searchParams.get('perPage') || 'all';

  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchWith({ sort: event?.target.value });
  }

  const getSortedPhones = () => {
    const sorted = [...phones];

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

  useEffect(() => {
    getData<Products[]>('./api/products.json')
      .then(data =>
        setPhones(data.filter(phone => phone.category === 'phones')),
      )
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

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

      <h1 className={styles.title}>Mobile phones</h1>

      <p className={styles.phonesModels}>{phones.length} Models</p>

      <div className={styles.bySortedBlock}>
        <div className={styles.bySorted}>Sort by</div>
        <select
          className={styles.select}
          value={sortType}
          onChange={handleQueryChange}
        >
          <option value="age">Newest</option>
          <option value="title">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>
      </div>

      <div className={styles.byFilteredBlock}>
        <div className={styles.byItems}>Items on page</div>
        <select
          className={styles.select}
          value={perPage}
          onChange={event => {
            setPerPage(Number(event.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className={styles.catalogGrid}>
        {sortedPhones.map(phone => (
          <div key={phone.itemId} className={styles.gridItem}>
            <ProductCarts product={phone} />
          </div>
        ))}
      </div>
      {/* <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <img src="/img/vectorLeft.svg" alt="prev" />
        </button>
        <span>{page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          <img src="/img/vectorRight.svg" alt="next" />
        </button>
      </div> */}
    </div>
  );
};
