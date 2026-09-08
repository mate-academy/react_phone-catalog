import './CatalogPage.scss';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';
import { GetProducts } from '../../services/GetProducts';
import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { CustomDropdown } from '../CustomDropdown/CustomDropdown';

export const CatalogPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = searchParams.get('sortBy') || null;
  const itemsOnPage = searchParams.get('perPage') || null;
  const activeCurrentPage = searchParams.get('activePage') || null;

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
    const params = new URLSearchParams(searchParams);
    let changed = false;

    if (!params.has('sortBy')) {
      params.set('sortBy', 'newest');
      changed = true;
    }

    if (!params.has('perPage')) {
      params.set('perPage', 'all');
      changed = true;
    }

    if (!params.has('activePage')) {
      params.set('activePage', '1');
      changed = true;
    }

    if (changed) {
      setSearchParams(params);
    }
  }, [gadgets, searchParams, setSearchParams]);

  useEffect(() => {
    GetProducts().then(data => {
      const productsFilter = data.filter(
        (item: Product) => item.category === gadgets,
      );

      setTotalProducts(productsFilter.length);

      setTimeout(() => {
        setIsLoading(true);
      }, 1000);

      const activePageNumber =
        location.pathname !== `/${gadgets}`
          ? 1
          : activeCurrentPage
            ? +activeCurrentPage
            : 1;

      setCurrentPage(activePageNumber);
      setIsPageActive(activePageNumber);

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

      const lastIndex = currentPage * productsPerPage;
      const firstIndex = lastIndex - productsPerPage;

      const safeFirst = Math.max(firstIndex, 0);
      const safeLast = Math.min(lastIndex, productsFilter.length);

      currentProducts = currentProducts.slice(safeFirst, safeLast);

      setFilteredProducts(currentProducts);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [gadgets, sortField, itemsOnPage, productsPerPage, currentPage]);

  const pageNumbers: number[] = [];

  if (productsPerPage > 0 && totalProducts > 0) {
    for (
      let index = 1;
      index <= Math.ceil(totalProducts / productsPerPage);
      index++
    ) {
      pageNumbers.push(index);
    }
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setIsPageActive(pageNumber);

    const params = new URLSearchParams(searchParams);

    params.set('activePage', pageNumber.toString());

    setSearchParams(params);
  };

  const nextPage = () =>
    setCurrentPage(prev => {
      if (currentPage === pageNumbers.length) {
        setIsPageActive(prev);

        return prev;
      }

      const toNextPage = prev + 1;

      setIsPageActive(toNextPage);

      const params = new URLSearchParams(searchParams);

      params.set('activePage', toNextPage.toString());

      setSearchParams(params);

      return toNextPage;
    });

  const previousPage = () =>
    setCurrentPage(prev => {
      if (currentPage === 1) {
        setIsPageActive(prev);

        return prev;
      }

      const toPrevPage = prev - 1;

      setIsPageActive(toPrevPage);

      const params = new URLSearchParams(searchParams);

      params.set('activePage', toPrevPage.toString());

      setSearchParams(params);

      return toPrevPage;
    });

  const optionsItemsOnPage = [
    { label: 'all', value: 'all' },
    { label: '4', value: '4' },
    { label: '8', value: '8' },
    { label: '16', value: '16' },
  ];

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

          <h3 className="catalog__page-models">{totalProducts} models</h3>

          <div className="catalog-sort-dropdowns">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="catalog-sort-label sort-by">
              Sort by
              <CustomDropdown
                options={[
                  { label: 'newest', value: 'newest' },
                  { label: 'cheapest', value: 'cheapest' },
                ]}
                value={sortField ? sortField : ''}
                onChange={val => {
                  const params = new URLSearchParams(searchParams);

                  params.set('sortBy', val);
                  params.set('activePage', '1');

                  setIsPageActive(1);
                  setCurrentPage(1);
                  setSearchParams(params);
                }}
              />
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className="catalog-sort-label items-on-page"
            >
              Items on page
              <CustomDropdown
                options={optionsItemsOnPage}
                value={itemsOnPage ? itemsOnPage : ''}
                onChange={val => {
                  setCurrentPage(1);
                  setIsPageActive(1);

                  const params = new URLSearchParams(searchParams);

                  params.set('perPage', val);
                  params.set('activePage', '1');

                  setIsPageActive(1);
                  setCurrentPage(1);
                  setSearchParams(params);
                }}
              />
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
