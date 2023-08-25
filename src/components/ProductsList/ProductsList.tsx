/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';
import { ProductCard } from '../ProductCard/ProductCard';
import { sortingProducts } from '../../utils/sortingProducts';
import { SortType } from '../../types/sortType';
import { Pagination } from '../Pagination/Pagination';

export const getPhones = (prods: Product[]) => {
  const phones = prods.filter(p => p.type === 'phone');

  return phones;
};

export const ProductsList = () => {
  const { products } = useProducts();
  const [isLoading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('0');
  const phones = getPhones(products);
  const sortedPhones = sortingProducts(phones, sortBy);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value as SortType;

    setSortBy(selectedSort);
  };

  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const handleCurrentPage = (page: number) => {
    if (currentPage !== page) {
      setCurrentPage(page);
    }
  };

  const startItem = ((currentPage - 1) * perPage);
  const endItem = (currentPage * perPage) > sortedPhones.length
    ? sortedPhones.length
    : startItem + perPage;

  const arrOfPerPageItems = sortedPhones.slice(startItem, endItem);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      {isLoading ? <Loader /> : (
        <div className="productsList" data-cy="productList">
          <h2 className="productsList__title">
            Mobile phones
          </h2>
          <p className="productsList__subtitle">{`${phones.length} models`}</p>

          <div className="productsList__sort">
            <div className="productsList__sortBy">
              <form action="" className="productsList__form">
                <label htmlFor="sortSelect" className="productsList__label">
                  Sort by
                </label>

                <select
                  name="sortSelect"
                  id="sortSelect"
                  className="productsList__select"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  {sortBy === '0' && <option value="0">Choose</option>}
                  <option
                    className="productsList__option"
                    value="name"
                  >
                    Alphabetically
                  </option>

                  <option
                    className="productsList__option"
                    value="age"
                  >
                    Newest
                  </option>

                  <option
                    className="productsList__option"
                    value="price"
                  >
                    Cheapest
                  </option>
                </select>
              </form>

              <form className="productsList__form">
                <label htmlFor="perPageSelector" className="productsList__label">
                  Items on page
                </label>

                <select
                  id="perPageSelector"
                  className="productsList__select"
                  value={perPage}
                  onChange={(event) => handlePerPage(event)}
                >
                  <option className="productsList__option" value="4">4</option>
                  <option className="productsList__option" value="8">8</option>
                  <option className="productsList__option" value="16">16</option>
                  <option className="productsList__option" value="all">all</option>
                </select>
              </form>
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

    </div>
  );
};
