import React, { useEffect, useState } from 'react';
import { Tablet } from '../../../../types/ProductTypes/Tablet';
import Loader from '../../../shared/components/Loader/Loader';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import SortSelect from '../SortSelect/SortSelect';
import TabletsList from '../TabletsList/TabletsList';
import Pagination from '../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import Header from '../../../shared/components/Header/Header';
import { ItensPerPage } from '../ItensPerPage/ItemsPerPage';

import styles from './TabletsPage.module.scss';

const TabletsPage: React.FC = () => {
  const [products, setProducts] = useState<Tablet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortFromUrl = searchParams.get('sort') || 'age';
  const [sortValue, setSortValue] = useState(sortFromUrl);

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const perPageFromUrl = parseInt(searchParams.get('perPage') || '8', 10);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState(perPageFromUrl);

  const fetchTablets = () => {
    setLoading(true);
    setError(false);

    fetch('/api/tablets.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: Tablet[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    fetchTablets();
  }, []);

  const handleSortChange = (value: string) => {
    setSortValue(value);
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (currentPage !== 1) searchParams.set('page', currentPage.toString());
    else searchParams.delete('page');

    if (perPage !== 8) searchParams.set('perPage', perPage.toString());
    else searchParams.delete('perPage');

    setSearchParams(searchParams);
  }, [currentPage, perPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage onReload={fetchTablets} />;
  if (products.length === 0) return <p className={styles.noResults}>There are no tablets yet.</p>;

  const sortedTablets = [...products].sort((a, b) => {
    if (sortValue === 'age') return (b.year || 0) - (a.year || 0);
    if (sortValue === 'title') return a.name.localeCompare(b.name);
    if (sortValue === 'price') return a.priceDiscount - b.priceDiscount;
    return 0;
  });

  const start = (currentPage - 1) * perPage;
  const end = perPage === 0 ? sortedTablets.length : start + perPage;
  const visibleProducts =
    perPage === 0 ? sortedTablets : sortedTablets.slice(start, end);

  return (
    <div>
      <Header />

      <div className={styles.tabletsPage}>

        {/* TÍTULO */}
        <div className={styles.header}>
          <h1 className={styles.title}>Tablets</h1>
          <p className={styles.modelsCount}>{products.length} models</p>
        </div>

        {/* SORT + ITEMS PER PAGE */}
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

        {/* LISTA */}
        <div className={styles.tabletsList}>
          <TabletsList products={visibleProducts} />
        </div>

        {/* PAGINAÇÃO */}
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
            setPerPage={setPerPage}
            total={sortedTablets.length}
          />
        </div>

      </div>
    </div>
  );
};

export default TabletsPage;
