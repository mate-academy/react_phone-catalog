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
import { getPhones } from '../../api/getProduct';
import s from './PhonesPage.module.css';

const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isChangingPage, setIsChangingPage] = useState(false);

  window.console.log(isError);

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

  const fetchPhones = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const phonesData = await getPhones();

      setPhones(phonesData);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhones();
  }, [fetchPhones]);

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

  const sortedPhones = phones.slice().sort((a, b) => {
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

  const filteredPhones = sortedPhones.filter(phone =>
    phone.name.toLowerCase().includes(query.toLowerCase()),
  );

  const paginatedPhones =
    perPage === 'all'
      ? filteredPhones
      : filteredPhones.slice(
          (currentPage - 1) * perPage,
          currentPage * perPage,
        );

  return (
    <div className={s.content}>
      <div className="container">
        <Breadcrumbs />

        <Heading className={s.title} as="h1">
          Mobile phones
        </Heading>

        {isLoading && <Loader />}
        {isError && (
          <div className={s.error}>
            <p>Failed to load phones. Please try again later.</p>
            <Button variant="primary" size={[120, 40]} onClick={fetchPhones}>
              Reload
            </Button>
          </div>
        )}
        {!isLoading && !isError && filteredPhones.length === 0 && (
          <p>There are no phones products matching the query</p>
        )}

        {!isLoading && !isError && filteredPhones.length > 0 && (
          <>
            <p className={s.quantity}>{phones.length} models</p>

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
              {typeof perPage === 'number' && phones.length > perPage && (
                <Pagination
                  total={filteredPhones.length}
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

export default PhonesPage;
