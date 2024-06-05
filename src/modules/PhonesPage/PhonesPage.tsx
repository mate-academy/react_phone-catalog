import { useEffect, useState } from 'react';

import Heading from '../../UI/Heading/Heading';
import { getPhones } from '../../api/getProduct';
import Product from '../../types/Product';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Pagination } from '../shared/Pagination';
import ProductsList from '../shared/ProductsList/ProductsList';
import s from './PhonesPage.module.css';

const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('newest'); // Default sort option

  useEffect(() => {
    getPhones().then(setPhones);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
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

  const paginatedPhones = sortedPhones.slice(
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
            value={perPage}
            onChange={e => {
              setCurrentPage(1);
              setPerPage(Number(e.target.value));
            }}
            className={s.select}
          >
            <option value={4}>4 per page</option>
            <option value={8}>8 per page</option>
            <option value={16}>16 per page</option>
            <option value={phones.length}>All</option>
          </select>
        </div>
        <p className={s.quantity}>{phones.length} models</p>
        <ProductsList products={paginatedPhones} />

        <div className={s.pagination}>
          <Pagination
            total={sortedPhones.length}
            currentPage={currentPage}
            perPage={perPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PhonesPage;
