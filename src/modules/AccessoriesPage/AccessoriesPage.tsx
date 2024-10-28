import { Product } from '../../types/ProductCard';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from './components/Pagination/Pagination';
import { AccessoriesList } from '../AccessoriesPage/components/AccessoriesList';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = Number(searchParams.get('perPage')) || 4;
  const sort = searchParams.get('sort') || 'age';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('../../../public/api/products.json');

        if (!response.ok) {
          throw new Error('There are no products yet');
        }

        const data = await response.json();
        const filteredProducts = data.filter(
          (product: Product) => product.category === 'accessories',
        );

        setAccessories(filteredProducts);
      } catch (error) {
        setError('There are no phones yet');
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchProducts();
  }, []);

  const sortedAccessories = [...accessories].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedAccessories.length / itemsPerPage);
  const paginatedAccessories = sortedAccessories.slice(
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
    const perSort = event.target.value;

    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.set('page', '1');
      newParams.set('sort', perSort);

      return newParams;
    });
  };

  return (
    <div className="accessories-page">
      <h1>Accessories page</h1>

      {loading && <Loader />}
      {error && <div>{error}</div>}
      {!loading && !error && accessories.length === 0 && (
        <div>There are no phones yet.</div>
      )}

      {!loading && !error && accessories.length > 0 && (
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
              totalItems={sortedAccessories.length}
            />
          )}

          <AccessoriesList products={paginatedAccessories} />
        </>
      )}
    </div>
  );
};

export default AccessoriesPage;
