import { NavLink } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';
import { useState } from 'react';
import { Pagination } from '../Pagination';

type ProductsListProps = {
  products: Product[];
  category: string;
};

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  category,
}) => {
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const start = perPage * (currentPage - 1);
  const end = Math.min(perPage * currentPage, products.length);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <div className="products-list">
        <div className="products-list__navigation">
          <NavLink to="/" className="products-list__home-icon" />
          <div className="products-list__arrow-icon"></div>
          <div className="products-list__category">{category}</div>
        </div>
        <h1 className="products-list__title">Mobile phones</h1>
        <p className="products-list__quantity">{products.length} models</p>
        <div className="products-list__sorting">
          <div className="select__container">
            <label htmlFor="sortBy" className="select__label">
              Sort by
            </label>
            <select className="select__box" name="sortBy" id="sortBy">
              <option value="newest">Newest</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="cheapest">Cheapest</option>
            </select>
            <div className="select__icon">
              <img src="/img/icons/down-gray.svg" alt="Select Icon" />
            </div>
          </div>
          <div className="select__container">
            <label htmlFor="sortBy" className="select__label">
              Items on page
            </label>
            <select
              className="select__box"
              name="sortBy"
              id="sortBy"
              onChange={handlePerPageChange}
              value={perPage}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value={products.length}>All</option>
            </select>
            <div className="select__icon">
              <img src="/img/icons/down-gray.svg" alt="Select Icon" />
            </div>
          </div>
        </div>
        <div className="products-list__container">
          {products.slice(start, end).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          total={products.length}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};
