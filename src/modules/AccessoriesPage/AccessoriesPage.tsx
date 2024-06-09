/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Dropdown from '../../UI/Dropdown/Dropdown';
import Heading from '../../UI/Heading/Heading';
import { getAccessories } from '../../api/getProduct';
import Product from '../../types/Product';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import Loader from '../shared/Loader/Loader';
import Pagination from '../shared/Pagination/Pagination';
import ProductsList from '../shared/ProductsList/ProductsList';
import s from './AccessoriesPage.module.css';

const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isChangingPage, setIsChangingPage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get('sort') || 'newest';
  const initialPerPage = queryParams.get('perPage') || '8';
  const initialPage = queryParams.get('page') || '1';

  const [perPage, setPerPage] = useState<number | 'all'>(
    initialPerPage === 'all' ? 'all' : Number(initialPerPage),
  );
  const [currentPage, setCurrentPage] = useState(Number(initialPage));
  const [sortOption, setSortOption] = useState(initialSort);

  const fetchAccessories = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const accessoriesData = await getAccessories();

      setAccessories(accessoriesData);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccessories();
  }, [fetchAccessories]);

  useEffect(() => {
    const newQueryParams = new URLSearchParams();

    newQueryParams.append('sort', sortOption);
    newQueryParams.append('page', currentPage.toString());
    newQueryParams.append('perPage', perPage.toString());
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

  const sortedPhones = accessories.slice().sort((a, b) => {
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

  const paginatedPhones =
    perPage === 'all'
      ? sortedPhones
      : sortedPhones.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className={s.content}>
      <div className="container">
        <div className={s.breadcrumbs}>
          <Breadcrumbs />
        </div>
        <Heading className={s.title} as="h1">
          Accessories
        </Heading>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <p>Error loading phones. Please try again later.</p>
        ) : (
          <>
            <p className={s.quantity}>{accessories.length} models</p>

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
              products={paginatedPhones}
              isChangingPage={isChangingPage}
            />
            <div className={s.pagination}>
              {typeof perPage === 'number' && accessories.length > perPage && (
                <Pagination
                  total={sortedPhones.length}
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

export default AccessoriesPage;
