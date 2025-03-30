import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { Product } from '../../../constants/common';
import './ProductsPage.scss';
import '../../HomePage/components/SliderCards/SliderCards.scss';
import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../../../components/Breadcrumbs/Breadcrumbs';
import { fetchProducts } from '../../../utils/fetchProducts';
import { ProductCard } from '../../../components/ProductCard';
import { Loader } from '../../../components/Loader';
import { withMinDelay } from '../../../utils/delay';

export const ProductsPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const validCategories = ['phones', 'tablets', 'accessories'];

  const sortByParams = searchParams.get('sort') || 'age';
  const sortByCount = searchParams.get('perPage') || '4';

  const page = Number(searchParams.get('page') || '1');
  const perPage = sortByCount === 'all' ? products.length : Number(sortByCount);

  const pageCount = sortByCount === 'all' ? 1 : Math.ceil(products.length / perPage);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  

  if (!category || !validCategories.includes(category)) {
    return <Navigate to="/not-found" replace />;
  }

  const categoryTitles: Record<string, string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const title = category ? categoryTitles[category] || 'Products' : 'Products';

  useEffect(() => {
    if (category) {
      setIsLoading(true);
      setHasError(false);

      withMinDelay(fetchProducts(category), 1000)
        .then(data => {
          setProducts(data);
        })
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [category]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    params.set('perPage', value);
    params.delete('page'); // reset page to 1 on perPage change
    setSearchParams(params);
    setIsOpen(false);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    setSearchParams(params);
    setIsOpen(false);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortByParams === 'age') {
      return b.year - a.year;
    }
    if (sortByParams === 'title') {
      return a.name.localeCompare(b.name);
    }
    if (sortByParams === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  const visibleProducts = sortByCount === 'all'
    ? sortedProducts
    : sortedProducts.slice(startIndex, endIndex);

  const MAX_VISIBLE_PAGES = 5;
  let startPage = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
  let endPage = startPage + MAX_VISIBLE_PAGES - 1;

  if (endPage > pageCount) {
    endPage = pageCount;
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  const visiblePageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePageNumbers.push(i);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="products">
      <div className="products__container products__container--with-pagination">
        <Breadcrumbs />

        {isLoading && <Loader />}

        {!isLoading && hasError && (
          <div className="products__error">
            <p>Oops! Something went wrong while loading data.</p>
            <button
              onClick={() => window.location.reload()}
              className="reload-button"
            >
              Reload
            </button>
          </div>
        )}

        {!isLoading && !hasError && products.length === 0 && (
          <p className="products__empty">There are no {category} yet.</p>
        )}

        {!isLoading && !hasError && products.length > 0 && (
          <>
            <h1 className="products__title title">{title}</h1>
            <p className="products__count">{products.length} models</p>

            <div className="products__filter-content">
              <div className="products__filter-group">
                <label htmlFor="sort" className="products__filter-label">
                  Sort by
                </label>
                <select
                  id="sort"
                  onFocus={() => setIsOpen(true)}
                  onBlur={() => setIsOpen(false)}
                  className={`products__filter-select ${isOpen ? 'products__filter-select--open' : ''}`}
                  value={sortByParams}
                  onChange={handleSortChange}
                >
                  <option value="age">Newest</option>
                  <option value="title">Alphabetically</option>
                  <option value="price">Cheapest</option>
                </select>
              </div>

              <div className="products__filter-group">
                <label htmlFor="items-per-page" className="products__filter-label">
                  Items on page
                </label>
                <select
                  id="items-per-page"
                  onFocus={() => setIsOpen(true)}
                  onBlur={() => setIsOpen(false)}
                  className={`products__filter-select ${isOpen ? 'products__filter-select--open' : ''}`}
                  value={sortByCount}
                  onChange={handleSelectChange}
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">all</option>
                </select>
              </div>
            </div>

            <div className="products__cards cards">
              <ul className="cards__list">
                {visibleProducts.map((product, index) => (
                  <li className="cards__item" key={index}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            </div>

            {pageCount > 1 && (
              <div className="products__pagination pagination">
                <ol className="pagination__list">
                  <li>
                    <button
                      disabled={page === 1}
                      onClick={() => setSearchParams(prev => {
                        const newParams = new URLSearchParams(prev);
                        if (page - 1 > 1) {
                          newParams.set('page', String(page - 1));
                        } else {
                          newParams.delete('page');
                        }
                        return newParams;
                      })}
                    >
                      {'<'}
                    </button>
                  </li>

                  {visiblePageNumbers.map(num => (
                    <li key={num}>
                      <button
                        className={num === page ? 'active-btn' : ''}
                        onClick={() => setSearchParams(prev => {
                          const newParams = new URLSearchParams(prev);
                          if (num === 1) {
                            newParams.delete('page');
                          } else {
                            newParams.set('page', String(num));
                          }
                          return newParams;
                        })}
                      >
                        {num}
                      </button>
                    </li>
                  ))}

                  <li>
                    <button
                      disabled={page === pageCount}
                      onClick={() => setSearchParams(prev => {
                        const newParams = new URLSearchParams(prev);
                        newParams.set('page', String(page + 1));
                        return newParams;
                      })}
                    >
                      {'>'}
                    </button>
                  </li>
                </ol>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
