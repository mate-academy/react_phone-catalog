import React, { useEffect, useState } from 'react';
import { Accessory } from '../../../../types/ProductTypes/Accessory';
import Loader from '../../../shared/components/Loader/Loader';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import SortSelect from '../SortSelect/SortSelect';
import AccessoriesList from '../AccessoriesList/AccessoriesList';
import Pagination from '../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import Header from '../../../shared/components/Header/Header';
import { ItensPerPage } from '../ItensPerPage/ItemsPerPage';

import styles from './AccessoriesPage.module.scss';

const AccessoriesPage: React.FC = () => {
  const [products, setProducts] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortFromUrl = searchParams.get('sort') || 'age';
  const [sortValue, setSortValue] = useState(sortFromUrl);

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const perPageFromUrl = parseInt(searchParams.get('perPage') || '8', 10);

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState(perPageFromUrl);

  const fetchAccessories = () => {
    setLoading(true);
    setError(false);

    fetch('/api/accessories.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: Accessory[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    fetchAccessories();
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
  if (error) return <ErrorMessage onReload={fetchAccessories} />;
  if (products.length === 0) return <p>There are no accessories yet.</p>;

  const sortedAccessories = [...products].sort((a, b) => {
    if (sortValue === 'age') return (b.year || 0) - (a.year || 0);
    if (sortValue === 'title') return a.name.localeCompare(b.name);
    if (sortValue === 'price') return a.priceDiscount - b.priceDiscount;
    return 0;
  });

  const start = (currentPage - 1) * perPage;
  const end = perPage === 0 ? sortedAccessories.length : start + perPage;
  const visibleAccessories = perPage === 0 ? sortedAccessories : sortedAccessories.slice(start, end);

  return (
    <div>
      <Header />

      <div className={styles.accessoriesPage}>
        
        {/* TITLE */}
        <div className={styles.header}>
          <h1 className={styles.title}>Accessories</h1>
          <p className={styles.modelsCount}>
            {products.length} models
          </p>
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

        {/* LIST */}
        <div className={styles.accessoriesList}>
          <AccessoriesList products={visibleAccessories} />
        </div>

        {/* PAGINATION */}
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
            setPerPage={setPerPage}
            total={sortedAccessories.length}
          />
        </div>

      </div>
    </div>
  );
};

export default AccessoriesPage;
