import { Product } from '../../types/ProductCard';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../AccessoriesPage/components/Pagination/Pagination';
import { ProductsList } from '../PhonesPage/components/ProductsList/ProductsList';

export const TabletsPage: React.FC = () => {
  const [tablets, setsTablets] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = Number(searchParams.get('perPage')) || 4;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // const resolve = await fetch('../../../public/api/products.json');
        const baseUrl =
        window.location.hostname === 'localhost'
          ? 'http://localhost:5173/api'
          : 'https://anastasiiakorolko.github.io/react_phone-catalog/api';

        const resolve = await fetch(`${baseUrl}/products.json`);
        // const resolve = await fetch('https://anastasiiakorolko.github.io/react_phone-catalog/api/phones.json');


        if (!resolve.ok) {
          throw new Error('Products its not found');
        }

        const data = await resolve.json();
        const filteredTablets = data.filter(
          (tablet: Product) => tablet.category === 'tablets',
        );

        setsTablets(filteredTablets);
      } catch (error) {
        setError('There are no tablets yet');
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchProducts();
  }, []);

  const sortedTablets = [...tablets].sort((a, b) => {
    switch (sort) {
      case 'age':
        return a.year - b.year;
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedTablets.length) / itemsPerPage;
  const paginatedTablets = sortedTablets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.set('page', String(page));

      return newParams;
    });
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const perPage = event.target.value;

    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.set('page', '1');
      newParams.set('perPage', perPage);

      return newParams;
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;

    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.set('sort', sortValue);
      newParams.set('page', '1');

      return newParams;
    });
  };

  return (
    <div className="phones-page">
      <h1>Phones Page</h1>

      {loading && <Loader />}
      {error && <div>{error}</div>}
      {!loading && !error && tablets.length === 0 && (
        <div>There are no phones yet.</div>
      )}

      {!loading && !error && tablets.length > 0 && (
        <>
          <label htmlFor="sort-select">
            Sort by
            <select id="sort-select" value={sort} onChange={handleSortChange}>
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </label>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              totalItems={sortedTablets.length}
            />
          )}

          <ProductsList products={paginatedTablets} />
        </>
      )}
    </div>
  );
};

export default TabletsPage;
