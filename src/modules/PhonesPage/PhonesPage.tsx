import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Heading from '../../UI/Heading/Heading';
import { getPhones } from '../../api/getProduct';
import Product from '../../types/Product';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import ProductsList from '../shared/ProductsList/ProductsList';
import s from './PhonesPage.module.css';
import Pagination from '../shared/Pagination/Pagination';

const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get('sort') || 'newest';
  const initialPerPage = queryParams.get('perPage') || '4';
  const initialPage = queryParams.get('page') || '1';

  const [perPage, setPerPage] = useState<number | 'all'>(
    initialPerPage === 'all' ? 'all' : Number(initialPerPage),
  );
  const [currentPage, setCurrentPage] = useState(Number(initialPage));
  const [sortOption, setSortOption] = useState(initialSort);

  useEffect(() => {
    getPhones().then(setPhones);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const queryParams = new URLSearchParams();

    queryParams.append('sort', sortOption);
    queryParams.append('perPage', perPage.toString());
    navigate(`?${queryParams.toString()}`);
  }, [currentPage, perPage, sortOption, navigate]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'all' ? 'all' : Number(e.target.value);

    setPerPage(value);
    setCurrentPage(1);
  };

  const sortedPhones = phones.slice().sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return a.processor.localeCompare(b.processor);
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
        <Breadcrumbs />
        <Heading className={s.title} as="h1">
          Mobile phones
        </Heading>
        <div>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className={s.select}
          >
            <option value="newest">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
          <select
            value={perPage === 'all' ? 'all' : perPage.toString()}
            onChange={handlePerPageChange}
            className={s.select}
          >
            <option value="4">4 per page</option>
            <option value="8">8 per page</option>
            <option value="16">16 per page</option>
            <option value="all">All</option>
          </select>
        </div>
        <p className={s.quantity}>{phones.length} models</p>
        <ProductsList products={paginatedPhones} />

        <div className={s.pagination}>
          {typeof perPage === 'number' && phones.length > perPage && (
            <Pagination
              total={sortedPhones.length}
              currentPage={currentPage}
              perPage={perPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PhonesPage;
