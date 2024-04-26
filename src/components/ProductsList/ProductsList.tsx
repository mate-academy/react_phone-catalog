import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';
import { useEffect, useState } from 'react';
import { Pagination } from '../Pagination';
import { Breadcrumbs } from '../Breadcrumbs';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { sortProducts } from './utils';
import { BASE_URL } from '../../api/api';

type ProductsListProps = {
  products: Product[];
  category: string;
};

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  category,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const initialPerPage = searchParams.get('perPage') || 'all';
  const [perPage, setPerPage] = useState(
    initialPerPage === 'all' ? products.length : Number(initialPerPage),
  );

  const initialSortBy = searchParams.get('sort');
  const [sortBy, setSortBy] = useState<string | null>(initialSortBy);

  const start = perPage * (currentPage - 1);
  const end = Math.min(perPage * currentPage, products.length);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = event.target.value;

    setPerPage(newPerPage === 'all' ? products.length : Number(newPerPage));
    setCurrentPage(1);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const productsToShow = sortBy ? sortProducts(products, sortBy) : products;

  useEffect(() => {
    const newSearchParams: URLSearchParamsInit = {};

    if (sortBy) {
      newSearchParams.sort = sortBy;
    }

    if (currentPage !== 1) {
      newSearchParams.page = currentPage.toString();
    }

    if (perPage !== products.length) {
      newSearchParams.perPage = perPage.toString();
    }

    setSearchParams(newSearchParams, { replace: true });
  }, [sortBy, currentPage, perPage, setSearchParams, products.length]);

  return (
    <div className="container">
      <div className="products-list">
        <Breadcrumbs category={category} />
        <h1 className="products-list__title">{category}</h1>
        <p className="products-list__quantity">{products.length} models</p>
        <div className="products-list__sorting">
          <div className="select__container">
            <label htmlFor="sortBy" className="select__label">
              Sort by
            </label>
            <select
              className="select__box"
              name="sortBy"
              id="sortBy"
              onChange={handleSortChange}
              value={sortBy || undefined}
            >
              <option value="newest">Newest</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="cheapest">Cheapest</option>
            </select>
            <div className="select__icon">
              <img
                src={`${BASE_URL}/img/icons/down-gray.svg`}
                alt="Select Icon"
              />
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
              <img
                src={`${BASE_URL}/img/icons/down-gray.svg`}
                alt="Select Icon"
              />
            </div>
          </div>
        </div>
        <div className="products-list__container">
          {productsToShow.slice(start, end).map(product => (
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
