import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import './Catalog.css';

const SORT_OPTIONS = {
  age: 'Newest',
  title: 'Alphabetically',
  price: 'Cheapest',
};

const PER_PAGE_OPTIONS = [4, 8, 16, 'all'];

function Catalog({
  products,
  cart,
  favorites,
  addToCart,
  addToFavorites,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const page = Number(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || 'all';

  
  const sortedProducts = useMemo(() => {
    const prepared = [...products];

    switch (sort) {
      case 'title':
        return prepared.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      case 'price':
        return prepared.sort(
          (a, b) => a.priceDiscount - b.priceDiscount
        );

      case 'age':
      default:
        return prepared.sort((a, b) => b.year - a.year);
    }
  }, [products, sort]);

 
  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const start = (page - 1) * perPage;
    const end = start + Number(perPage);

    return sortedProducts.slice(start, end);
  }, [sortedProducts, page, perPage]);

  const totalPages =
    perPage === 'all'
      ? 1
      : Math.ceil(sortedProducts.length / perPage);

 
  const handleSortChange = (e) => {
    setSearchParams({ sort: e.target.value });
  };

  const handlePerPageChange = (e) => {
    const value = e.target.value;

    if (value === 'all') {
      setSearchParams({ sort });
    } else {
      setSearchParams({
        sort,
        perPage: value,
        page: '1',
      });
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({
      sort,
      perPage,
      page: String(newPage),
    });
  };

  if (!products.length) {
    return <h2>There are no products yet</h2>;
  }

  return (
    <section className="catalog">
      <h1 className="catalog-title">Products</h1>

      
      <div className="catalog-controls">
        <label>
          Sort by:{' '}
          <select value={sort} onChange={handleSortChange}>
            {Object.entries(SORT_OPTIONS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Items on page:{' '}
          <select value={perPage} onChange={handlePerPageChange}>
            {PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

     
      <div className="catalog-grid">
        {visibleProducts.map(product => (
          <ProductCard
            key={product.id || product.itemId}
            product={product}
            cart={cart}
            favorites={favorites}
            addToCart={addToCart}
            addToFavorites={addToFavorites}
          />
        ))}
      </div>

     
      {totalPages > 1 && (
        <div className="catalog-pagination">
          {Array.from({ length: totalPages })
            .map((_, i) => i + 1)
            .map(p => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                disabled={p === page}
              >
                {p}
              </button>
            ))}
        </div>
      )}
    </section>
  );
}

export default Catalog;
