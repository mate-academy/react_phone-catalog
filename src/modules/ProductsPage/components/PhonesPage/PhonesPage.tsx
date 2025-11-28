import React, { useEffect, useState } from 'react';
import { Phone } from '../../../../types/ProductTypes/Phone';
import Loader from '../../../shared/components/Loader/Loader';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import SortSelect from '../SortSelect/SortSelect';
import PhonesList from '../PhonesList/PhonesList';
import Pagination from '../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import Header from '../../../shared/components/Header/Header';
import { ItensPerPage } from '../ItensPerPage/ItemsPerPage';

import styles from './PhonesPage.module.scss';

const PhonesPage: React.FC = () => {
  const [products, setProducts] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortFromUrl = searchParams.get('sort') || 'age';
  const [sortValue, setSortValue] = useState(sortFromUrl);

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const perPageFromUrl = parseInt(searchParams.get('perPage') || '8', 10);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState(perPageFromUrl);

  const fetchPhones = () => {
    setLoading(true);
    setError(false);

    fetch('/api/phones.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        return res.json();
      })
      .then((data: Phone[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  const handleSortChange = (value: string) => {
    setSortValue(value);
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (currentPage !== 1) {
      params.set('page', currentPage.toString());
    } else {
      params.delete('page');
    }

    if (perPage !== 8) {
      params.set('perPage', perPage.toString());
    } else {
      params.delete('perPage');
    }

    setSearchParams(params);
  }, [currentPage, perPage, searchParams, setSearchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage onReload={fetchPhones} />;
  }

  if (products.length === 0) {
    return <p>There are no phones yet.</p>;
  }

  const sortedPhones = [...products].sort((a, b) => {
    if (sortValue === 'age') {
      return b.year - a.year;
    }

    if (sortValue === 'title') {
      return a.name.localeCompare(b.name);
    }

    if (sortValue === 'price') {
      return a.priceDiscount - b.priceDiscount;
    }

    return 0;
  });

  const start = (currentPage - 1) * perPage;
  const end = perPage === 0 ? sortedPhones.length : start + perPage;
  const visiblePhones =
    perPage === 0 ? sortedPhones : sortedPhones.slice(start, end);

  return (
    <div>
      <Header />

      <div className={styles.phonesPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mobile Phones</h1>
          <p className={styles.modelsCount}>{products.length} models</p>
        </div>

        <div className={styles.filterControls}>
          <div className={styles.sortWrapper}>
            <span className={styles.label}>Sort by</span>
            <SortSelect onSortChange={handleSortChange} value={sortValue} />
          </div>

          <div className={styles.perPageWrapper}>
            <span className={styles.label}>Items per page</span>
            <ItensPerPage
              perPage={perPage}
              onChange={setPerPage}
              options={[4, 8, 16, 24]}
            />
          </div>
        </div>

        <div className={styles.phonesList}>
          <PhonesList products={visiblePhones} />
        </div>

        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
            setPerPage={setPerPage}
            total={sortedPhones.length}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default PhonesPage;
