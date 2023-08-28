/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';
import { ProductCard } from '../ProductCard/ProductCard';
import { sortingProducts } from '../../utils/sortingProducts';
import { SortType } from '../../types/sortType';
import { Pagination } from '../Pagination/Pagination';
import { Selector } from '../Selector/Selector';

export const getPhones = (prods: Product[]) => {
  const phones = prods.filter(p => p.type === 'phone');

  return phones;
};

const sortSortBy = ['Newest', 'Alphabetically', 'Cheapest'];
const sortValues = ['age', 'name', 'price'];
const itemsPerPage = ['4', '8', '16', 'all'];
const labels = ['Sort by', 'Items on page'];

export const ProductsList = () => {
  const { products } = useProducts();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get('sort') || 'age';

  const [isLoading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(initialSort);
  const [perPage, setPerPage] = useState('8');
  const [currentPage, setCurrentPage] = useState(1);

  const phones = getPhones(products);
  const sortedPhones = sortingProducts(phones, sortBy);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value as SortType;

    setSortBy(selectedSort);
    queryParams.set('sort', selectedSort);
    window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);
  };

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'all') {
      setPerPage(sortedPhones.length.toString());
    } else {
      setPerPage(event.target.value);
    }

    setCurrentPage(1);
  };

  const handleCurrentPage = (page: number) => {
    if (currentPage !== page) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setSortBy(initialSort);
  }, [location.search]);

  // console.log('location', location);
  // console.log('location.search', location.search);

  const startItem = ((currentPage - 1) * +perPage);
  const endItem = (currentPage * +perPage) > sortedPhones.length
    ? sortedPhones.length
    : startItem + perPage;

  const arrOfPerPageItems = sortedPhones.slice(startItem, +endItem);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? <Loader /> : (
        <div className="productsList" data-cy="productList">
          <h2 className="productsList__title">
            Mobile phones
          </h2>
          <p className="productsList__subtitle">{`${phones.length} models`}</p>

          <div className="productsList__sort">
            <div className="productsList__sortBy">
              <Selector
                sortBy={sortBy}
                label={labels[0]}
                handleChange={handleSortChange}
                sortKeys={sortSortBy}
                sortValues={sortValues}
              />
            </div>

            <div className="productsList__perPage">
              <Selector
                sortBy={perPage}
                label={labels[1]}
                handleChange={(event) => handlePerPage(event)}
                sortKeys={itemsPerPage}
                sortValues={itemsPerPage}
              />
            </div>
          </div>

          <div className="productsList__cards">
            {arrOfPerPageItems.map(phone => (
              <div className="productsList__card" key={phone.id}>
                <ProductCard product={phone} />
              </div>
            ))}
          </div>
          <Pagination
            total={sortedPhones.length}
            perPage={perPage}
            currentPage={currentPage}
            onPageChange={handleCurrentPage}
          />
        </div>
      )}
    </>
  );
};
