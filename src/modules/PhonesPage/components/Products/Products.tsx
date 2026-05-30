import './Products.scss';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './../Pagination/Pagination';
import { Product } from '../../../../types/Product';
import { ProductsList } from '../ProductsList';

type Props = {
  products: Product[];
  sortBy: string;
};

export const Products: React.FC<Props> = ({ products, sortBy }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filteredProducts = products.filter(
    product => product.category === sortBy,
  );

  const sortParam = searchParams.get('sort') || 'year';
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortParam) {
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      default:
        return b.year - a.year;
    }
  });

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (newSort === 'year') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', newSort);
    }

    newParams.set('page', '1');

    setSearchParams(newParams);
  };

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const perPageParam = searchParams.get('perpage');
  const itemsPerPage =
    perPageParam === 'all'
      ? sortedProducts.length
      : parseInt(perPageParam || '16', 10);

  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const setCurrentPage = (page: number) => {
    setSearchParams({
      page: page.toString(),
      perpage: itemsPerPage.toString(),
    });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: '1',
      perpage: e.target.value,
    });
  };

  return (
    <>
      <section className="products">
        <div className="products__row">
          <div className="products__select-container">
            <label htmlFor="sort-select" className="products__label">
              Sort by
            </label>
            <select
              id="sort-select"
              className="products__select"
              onChange={handleSort}
              value={sortParam}
            >
              <option value="year" className="products__option">
                Newest
              </option>
              <option value="title" className="products__option">
                Alphabetically
              </option>
              <option value="price" className="products__option">
                Cheapest
              </option>
            </select>
          </div>
          <div className="products__select-container">
            <label htmlFor="per-page-select" className="products__label">
              Items on page
            </label>
            <select
              id="per-page-select"
              className="products__select"
              onChange={handlePerPageChange}
              value={perPageParam || '16'}
            >
              <option value="4" className="products__option">
                4
              </option>
              <option value="8" className="products__option">
                8
              </option>
              <option value="16" className="products__option">
                16
              </option>
              <option value="all" className="products__option">
                All
              </option>
            </select>
          </div>
        </div>
        <ProductsList products={paginatedProducts} />
        {paginatedProducts.length === sortedProducts.length ? (
          ''
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </>
  );
};
