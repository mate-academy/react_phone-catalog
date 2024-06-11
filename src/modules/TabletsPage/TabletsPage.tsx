/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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
import s from './TabletsPage.module.css';

const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isChangingPage, setIsChangingPage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const query = searchParams.get(SearchParams.Query) || '';
  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get('sort') || 'newest';
  const initialPerPage = queryParams.get('perPage') || 'all';
  const initialPage = queryParams.get('page') || '1';

  const [perPage, setPerPage] = useState<number | 'all'>(
    initialPerPage === 'all' ? 'all' : Number(initialPerPage),
  );
  const [currentPage, setCurrentPage] = useState(Number(initialPage));
  const [sortOption, setSortOption] = useState(initialSort);

  const fetchTablets = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const phonesData = await getTablets();

      setTablets(phonesData);
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

  const handleSortChange = (selectedOption: any) => {
    setIsChangingPage(true);
    setSortOption(selectedOption.value);
    setCurrentPage(1);
    setTimeout(() => {
      setIsChangingPage(false);
    }, 800);
  };

  const handlePerPageChange = (selectedOption: any) => {
    setIsChangingPage(true);
    const value =
      selectedOption.value === 'all' ? 'all' : Number(selectedOption.value);

    setPerPage(value);
    setCurrentPage(1);
    setTimeout(() => {
      setIsChangingPage(false);
    }, 800);
  };

  const sortedTablets = tablets.slice().sort((a, b) => {
    switch (sortOption) {
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
    <div className={s.content}>
      <div className="container">
        <Breadcrumbs />

        <Heading className={s.title} as="h1">
          Tablets
        </Heading>

        {isLoading && <Loader />}
        {isError && (
          <div className={s.error}>
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
            <p className={s.quantity}>{tablets.length} models</p>

            <div className={s.filter}>
              <div>
                <p className={s.label}>Sort by</p>
                <Dropdown
                  defaultValue={sortOption}
                  options={['newest', 'alphabetically', 'cheapest']}
                  dropdownWidth={150}
                  dropdownHeight={40}
                  onChange={handleSortChange}
                />
              </div>
              <div>
                <p className={s.label}>Items on page</p>
                <Dropdown
                  defaultValue={perPage === 'all' ? 'all' : perPage.toString()}
                  options={['4', '8', '16', 'all']}
                  dropdownWidth={128}
                  dropdownHeight={40}
                  onChange={handlePerPageChange}
                />
              </div>
            </div>

            <ProductsList
              products={paginatedTablets}
              isChangingPage={isChangingPage}
            />
            <div className={s.pagination}>
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
