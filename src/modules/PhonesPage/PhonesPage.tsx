import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/ProductCard';
import { Loader } from '../../components/Loader/Loader';
import { ProductsList } from './components/ProductsList/ProductsList';
// import { Pagination } from "./components/ProductsList/Pagination/Pagination";
import { Pagination } from '../PhonesPage/components/ProductsList/Pagination/Pagination';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = Number(searchParams.get('perPage')) || 4;

  const fetchProducts = async () => {
    setLoader(true);
    try {
      // const response = await fetch('https://anastasiiakorolko.github.io/react_phone-catalog/api/phones.json');

      // const resolve = await fetch('../../../public/api/products.json');
      const resolve = await fetch('http://localhost:5173/api/products.json');

      if (!resolve.ok) {
        throw new Error('There are no products yet');
      }

      const data = await resolve.json();
      const filteredProducts = data.filter(
        (prod: Product) => prod.category === 'phones',
      );

      setPhones(filteredProducts);
      setError('');
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleReload = () => {
    fetchProducts();
  };

  const sortedPhones = [...phones].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedPhones.length / itemsPerPage);
  const paginatedPhones = sortedPhones.slice(
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

      {loader && <Loader />}
      {error && (
        <div>
          {error}
          <button onClick={handleReload}>Reload</button>
        </div>
      )}
      {!loader && !error && phones.length === 0 && (
        <div>There are no phones yet.</div>
      )}

      {!loader && !error && phones.length > 0 && (
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
              totalItems={sortedPhones.length}
            />
          )}

          <ProductsList products={paginatedPhones} />
        </>
      )}
    </div>
  );
};

export default PhonesPage;
