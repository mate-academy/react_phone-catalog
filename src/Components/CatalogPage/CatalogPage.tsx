// import { Footer } from "../Footer/Footer";
import './CatalogPage.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';
import { GetProducts } from '../../services/GetProducts';
import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';

export const CatalogPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortField, setSortField] = useState('newest');
  const [itemsOnPage, setItemsOnPage] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const gadgets = useMemo(() => {
    return location.pathname.split('/')[1];
  }, [location.pathname]);

  useEffect(() => {
    GetProducts().then(data => {
      const productsFilter = data.filter(
        (item: Product) => item.category === gadgets,
      );

      setTimeout(() => {
        setIsLoading(true);
      }, 1000);

      switch (sortField) {
        case 'newest':
          productsFilter.sort((a, b) => b.year - a.year);
          break;

        case 'cheapest':
          productsFilter.sort((a, b) => a.price - b.price);
          break;

        default:
          break;
      }

      let visibleProducts = productsFilter;

      switch (itemsOnPage) {
        case 'all':
          break;

        case '4':
          visibleProducts = visibleProducts.slice(0, 4);
          break;

        case '8':
          visibleProducts = visibleProducts.slice(0, 8);
          break;

        case '16':
          visibleProducts = visibleProducts.slice(0, 16);
          break;

        default:
          break;
      }

      setFilteredProducts(visibleProducts);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [gadgets, sortField, itemsOnPage]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="catalog__page">
          <nav className="catalog__nav-links">
            <NavLink to={'/'}>
              <img
                className="catalog__nav-link"
                src="/img/ui-kit/Home.png"
                alt="home"
              />
            </NavLink>
            <img
              className="catalog__nav-link"
              src="/img/ui-kit/chevron-arrow-right.png"
              alt="to-right"
            />
            <p className="catalog__nav-link">{gadgets}</p>
          </nav>

          {gadgets === 'phones' ? (
            <h1 className="catalog__page-title">Mobile Phones</h1>
          ) : (
            <h1 className="catalog__page-title">{gadgets}</h1>
          )}

          <h3 className="catalog__page-models">
            {filteredProducts.length} models
          </h3>

          <div className="catalog-sort-dropdowns">
            <label className="catalog-sort-label sort-by">
              Sort by
              <select
                className="catalog-sort"
                onChange={e => setSortField(e.target.value)}
                value={sortField}
              >
                <option value="newest">newest</option>
                <option value="cheapest">cheapest</option>
              </select>
            </label>
            <label className="catalog-sort-label items-on-page">
              Items on page
              <select
                className="catalog-sort"
                value={itemsOnPage}
                onChange={e => setItemsOnPage(e.target.value)}
              >
                <option value="all">all</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
              </select>
            </label>
          </div>

          <div className="catalog">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
