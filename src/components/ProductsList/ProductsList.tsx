import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';
import { useEffect, useState } from 'react';
import { Pagination } from '../Pagination';
import { Breadcrumbs } from '../Breadcrumbs';
import { useSearchParams } from 'react-router-dom';

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

  const initialSortBy = searchParams.get('sort') || 'newest';
  const [sortBy, setSortBy] = useState(initialSortBy);

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

  const sortProducts = (allProducts: Product[], sortType: string) => {
    const sorted = [...allProducts];

    switch (sortType) {
      case 'newest':
        return sorted.sort((a, b) => b.year - a.year);
      case 'alphabetically':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'cheapest':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  };

  const productsToShow = sortProducts(products, sortBy);

  useEffect(() => {
    const newSearchParams: any = { sort: sortBy };

    if (currentPage !== 1) {
      newSearchParams.page = currentPage;
    }

    if (perPage !== products.length) {
      newSearchParams.perPage = perPage;
    }

    setSearchParams(newSearchParams);
  }, [sortBy, currentPage, perPage, setSearchParams]);

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
              value={sortBy}
            >
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
