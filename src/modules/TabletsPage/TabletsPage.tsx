/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '../shared/Breadcrumbs';
import Button from '../../UI/Buttons/Button';
import Dropdown from '../../UI/Dropdown/Dropdown';
import Heading from '../../UI/Heading/Heading';
import Loader from '../shared/Loader/Loader';
import Pagination from '../shared/Pagination/Pagination';
import Product from '../../types/Product';
import ProductsList from '../shared/ProductsList/ProductsList';
import { SearchParams } from '../../types/Categories';
import { getTablets } from '../../api/getProduct';
import pageOptions from '../../constants/PageOptions';
import sortOptions from '../../constants/sortOptions';
import styles from './TabletsPage.module.css';

const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isChangingPage, setIsChangingPage] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get(SearchParams.Query) || '';
  const initialSort = searchParams.get('sort') || 'newest';
  const initialPerPage = searchParams.get('perPage') || 'all';
  const initialPage = searchParams.get('page') || '1';

  const [perPage, setPerPage] = useState<number | 'all'>(
    initialPerPage === 'all' ? 'all' : Number(initialPerPage),
  );
  const [currentPage, setCurrentPage] = useState(Number(initialPage));
  const [sortOption, setSortOption] = useState(initialSort);

  const fetchTablets = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const tabletsData = await getTablets();

      setTablets(tabletsData);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTablets();
  }, [fetchTablets]);

  useEffect(() => {
    const newQueryParams = new URLSearchParams();

    if (sortOption !== 'newest') {
      newQueryParams.append('sort', sortOption);
    }

    if (currentPage !== 1) {
      newQueryParams.append('page', currentPage.toString());
    }

    if (perPage !== 'all') {
      newQueryParams.append('perPage', perPage.toString());
    }

    navigate(`?${newQueryParams.toString()}`);
  }, [currentPage, perPage, sortOption, navigate]);

  const handlePageChange = (page: number) => {
    setIsChangingPage(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsChangingPage(false);
    }, 800);
  };

  const handleSortChange = (selectedOption: string) => {
    setIsChangingPage(true);

    setSortOption(selectedOption);

    setCurrentPage(1);
    setTimeout(() => {
      setIsChangingPage(false);
    }, 800);
  };

  const handlePerPageChange = (selectedOption: string) => {
    setIsChangingPage(true);
    const value = selectedOption === 'all' ? 'all' : Number(selectedOption);

    setPerPage(value);
    setCurrentPage(1);
    setTimeout(() => {
      setIsChangingPage(false);
    }, 800);
  };

  const sortedTablets = tablets.slice().sort((a, b) => {
    switch (sortOption.toLowerCase()) {
      case 'newest':
        return b.processor.localeCompare(a.processor);
      case 'alphabetically':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.priceRegular - b.priceRegular;
      default:
        return 0;
    }
  });

  const filteredTablets = sortedTablets.filter(tablet =>
    tablet.name.toLowerCase().includes(query.toLowerCase()),
  );

  const paginatedTablets =
    perPage === 'all'
      ? filteredTablets
      : filteredTablets.slice(
          (currentPage - 1) * perPage,
          currentPage * perPage,
        );

  return (
    <div className={styles.content}>
      <div className="container">
        <Breadcrumbs />

        <Heading className={styles.title} as="h1">
          Tablets
        </Heading>

        {isLoading && <Loader />}
        {isError && (
          <div className={styles.error}>
            <p>Failed to load tablets. Please try again later.</p>
            <Button variant="primary" size={[120, 40]} onClick={fetchTablets}>
              Reload
            </Button>
          </div>
        )}
        {!isLoading && !isError && filteredTablets.length === 0 && (
          <p>There are no tablets products matching the query</p>
        )}

        {!isLoading && filteredTablets.length > 0 && (
          <>
            <p className={styles.quantity}>{tablets.length} models</p>

            <div className={styles.filter}>
              <div>
                <p className={styles.label}>Sort by</p>
                <Dropdown
                  defaultValue={sortOption === 'newest' ? 'Newest' : sortOption}
                  options={sortOptions}
                  onChange={(option: string) => handleSortChange(option)}
                  sortOption={sortOption}
                />
              </div>
              <div>
                <p className={styles.label}>Items on page</p>
                <Dropdown
                  defaultValue={perPage === 'all' ? 'All' : perPage.toString()}
                  options={pageOptions}
                  onChange={(option: string) => handlePerPageChange(option)}
                  sortOption={String(perPage)}
                />
              </div>
            </div>

            <ProductsList
              products={paginatedTablets}
              isChangingPage={isChangingPage}
            />
            <div className={styles.pagination}>
              {typeof perPage === 'number' && tablets.length > perPage && (
                <Pagination
                  total={filteredTablets.length}
                  currentPage={currentPage}
                  perPage={perPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TabletsPage;
