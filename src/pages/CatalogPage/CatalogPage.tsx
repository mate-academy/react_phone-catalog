import { useEffect, useState, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import './CatalogPage.module.scss';

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // з URL (phones, tablets, accessories)
  const category = location.pathname.slice(1);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getProducts()
      .then(data => {
        const filtered = data.filter(p => p.category === category);

        setProducts(filtered);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  // Сортування (newest -> age, alphabetically -> title, cheapest -> price)
  const sort = searchParams.get('sort') || 'age';

  const visibleProducts = useMemo(() => {
    const sorted = [...products];

    switch (sort) {
      case 'age':
        sorted.sort((a, b) => b.year - a.year);
        break;
      case 'title':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sorted.sort((a, b) => a.price - b.price);
        break;
    }

    return sorted;
  }, [products, sort]);

  return (
    <div className="CatalogPage" data-cy="CatalogPage">
      <h1 className="title">
        {category.charAt(0).toUpperCase() + category.slice(1)} page
      </h1>

      {isLoading && <Loader />}

      {isError && (
        <div className="has-text-danger">
          Something went wrong.
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <p>There are no {category} yet</p>
      )}

      {!isLoading && !isError && products.length > 0 && (
        <div className="products-container">
          <p>Знайдено товарів: {visibleProducts.length}</p>
          {/* Наступним кроком замінимо це на ProductsList та ProductCard згідно з макетом */}
          <ul>
            {visibleProducts.map(p => (
              <li key={p.id}>
                {p.name} - ${p.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
