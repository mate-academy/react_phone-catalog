// import { Footer } from "../Footer/Footer";
import './CatalogPage.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';
import { GetProducts } from '../../services/GetProducts';
import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';

export const CatalogPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortField, setSortField] = useState('newest');
  const [itemsOnPage, setItemsOnPage] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const [isPageActive, setIsPageActive] = useState<number | undefined>();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(
    filteredProducts.length,
  );

  const [totalProducts, setTotalProducts] = useState(0);

  const location = useLocation();

  const gadgets = useMemo(() => {
    return location.pathname.split('/')[1];
  }, [location.pathname]);

  useEffect(() => {
    GetProducts().then(data => {
      const productsFilter = data.filter(
        (item: Product) => item.category === gadgets,
      );

      setTotalProducts(productsFilter.length);

      setTimeout(() => {
        setIsLoading(true);
      }, 1000);

      const lastIndex = currentPage * productsPerPage;
      const firstIndex = lastIndex - productsPerPage;

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

      let currentProducts = productsFilter;

      switch (itemsOnPage) {
        case 'all':
          setProductsPerPage(currentProducts.length);
          break;

        case '4':
          setProductsPerPage(4);
          break;

        case '8':
          setProductsPerPage(8);
          break;

        case '16':
          setProductsPerPage(16);
          break;

        default:
          break;
      }

      currentProducts = currentProducts.slice(firstIndex, lastIndex);

      setFilteredProducts(currentProducts);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [gadgets, sortField, itemsOnPage, productsPerPage, currentPage]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setIsPageActive(pageNumber);
  };

  const pageNumbers: number[] = [];

  for (
    let index = 1;
    index <= Math.ceil(totalProducts / productsPerPage);
    index++
  ) {
    pageNumbers.push(index);
  }

  const nextPage = () =>
    setCurrentPage(prev => {
      if (currentPage === pageNumbers.length) {
        setIsPageActive(prev);

        return prev;
      }

      setIsPageActive(prev + 1);

      return prev + 1;
    });

  const previousPage = () =>
    setCurrentPage(prev => {
      if (currentPage === 1) {
        setIsPageActive(prev);

        return prev;
      }

      setIsPageActive(prev - 1);

      return prev - 1;
    });

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
                src="img/ui-kit/Home.png"
                alt="home"
              />
            </NavLink>
            <img
              className="catalog__nav-link"
              src="img/ui-kit/chevron-arrow-right.png"
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
                onChange={e => {
                  setItemsOnPage(e.target.value);
                  setCurrentPage(1);
                  setIsPageActive(1);
                }}
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

          {pageNumbers.length > 1 && (
            <Pagination
              pageNumbers={pageNumbers}
              paginate={paginate}
              nextPage={nextPage}
              previousPage={previousPage}
              isPageActive={isPageActive}
            />
          )}

          <div className="setMargin"></div>
        </div>
      )}
    </>
  );
};
