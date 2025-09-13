import './Catalog.scss';
import { Product } from '../../../src/types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Link, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

type Props = {
  products: Product[];
  title: string;
};

export const Catalog: React.FC<Props> = ({ products, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page') || 1);

  const total = products.length;
  const perPageNumber = perPage === 'all' ? total : Number(perPage);
  const startIndex = (page - 1) * perPageNumber;
  const endIndex = startIndex + perPageNumber;
  const totalPages = perPage === 'all' ? 1 : Math.ceil(total / perPageNumber);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sort) {
        case 'age':
          return b.year - a.year;
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }, [products, sort]);

  const visibleProducts = useMemo(() => {
    return sortedProducts.slice(startIndex, Number(endIndex));
  }, [sortedProducts, startIndex, endIndex]);

  const handlePerPageChange = (string: string) => {
    setSearchParams({
      sort,
      perPage: string,
      page: '1',
    });
  };

  const handleFilterChange = (name: string) => {
    setSearchParams({
      sort: name,
      perPage: String(perPage),
      page: '1',
    });
  };

  const handlePageChange = (number: number) => {
    setSearchParams({
      sort,
      perPage: String(perPage),
      page: String(number),
    });
  };

  const visiblePages = (() => {
    const pagesToShow = 5;

    if (totalPages <= pagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage = Math.max(page - Math.floor(pagesToShow / 2), 1);
    let endPage = startPage + pagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - pagesToShow + 1;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  })();

  return (
    <div className="catalog">
      <div className="catalog__container">
        <div className="catalog__path">
          <div className="catalog__path--image">
            <Link to="/" className="catalog__path--image-img">
              <img src="../../../img/Home.png" alt="home" />
            </Link>
          </div>
          <div className="catalog__path--arrow">
            <img src="../../../img/arrow-right.png" alt="right" />
          </div>
          <div className="catalog__path--device">{title}</div>
        </div>
        <div className="catalog__title">
          <div className="catalog__title--text">
            {title === 'Phones' ? 'Mobile phones' : title}
          </div>
          <div className="catalog__title--amount">{products.length} items</div>
        </div>
        <div className="catalog__filter">
          <div className="catalog__filter--set">
            <div className="catalog__filter--set-name">Sort by</div>
            <select
              className="catalog__filter--set-select"
              value={sort}
              onChange={event => handleFilterChange(event.target.value)}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </div>
          <div className="catalog__filter--set">
            <div className="catalog__filter--set-name">Items on page</div>
            <select
              className="catalog__filter--set-select"
              value={perPage}
              onChange={event => handlePerPageChange(event.target.value)}
            >
              <option value="all">all</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
        </div>
      </div>
      <div className="catalog__grid">
        {visibleProducts.map(product => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      {perPage !== 'all' && (
        <div className="catalog__pagination">
          <button
            className="catalog__pagination--button"
            disabled={page === 1}
            onClick={() => page > 1 && handlePageChange(page - 1)}
          >
            <img
              src="../../../img/arrow-left.png"
              alt="prev"
              className="catalog__pagination--button-img"
            />
          </button>

          {visiblePages.map(pageNumber => (
            <button
              key={pageNumber}
              className={`catalog__pagination--button ${pageNumber === page ? 'button-active' : ''}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          <button
            className="catalog__pagination--button"
            disabled={page === totalPages}
            onClick={() => page < totalPages && handlePageChange(page + 1)}
          >
            <img
              src="../../../img/arrow-right.png"
              alt="next"
              className="catalog__pagination--button-img"
            />
          </button>
        </div>
      )}
    </div>
  );
};
