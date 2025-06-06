import React, { useContext, useEffect, useMemo, useState } from 'react';
import './ProductsPage.scss';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import { useSearchParams } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { Loader } from '../../shared/Loader';
import { DropDown } from '../../shared/DropDown';
import { Pagination } from '../../shared/Pagination';
import { ProductsList } from '../../shared/ProductsList';

const DEFAULT_SORT_BY = 'age';
const DEFAULT_ITEMS_PER_PAGE = '16';

type Props = {
  category: string;
};

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const { allProducts } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || DEFAULT_SORT_BY;
  const itemsPerPage = searchParams.get('perPage') || DEFAULT_ITEMS_PER_PAGE;
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setLoading(true);
    setError('');

    const timeout = setTimeout(() => {
      try {
        if (allProducts.length === 0) {
          setError(`There are no products yet`);
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [allProducts, category]);

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(prod => prod.category === category)
      .sort((product1, product2) => {
        switch (sortBy) {
          case 'age':
            return product2.year - product1.year;
          case 'alphabet':
            return product1.name.localeCompare(product2.name);
          case 'price':
            return product1.year - product2.year;
          default:
            return 0;
        }
      });
  }, [allProducts, category, sortBy]);

  const filteredProductsCount = useMemo(
    () => filteredProducts.length,
    [filteredProducts],
  );

  const handleSortChange = (option: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (option && option !== DEFAULT_SORT_BY) {
      newParams.set('sort', option);
    } else {
      newParams.delete('sort');
    }

    setSearchParams(newParams);
  };

  const handlePerPageChange = (option: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (option && option !== DEFAULT_ITEMS_PER_PAGE) {
      newParams.set('perPage', option);
    } else {
      newParams.delete('perPage');
    }

    setSearchParams(newParams);
  };

  const handlePageChange = (option: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (option > 0) {
      newParams.set('page', String(option));
    } else {
      newParams.delete('page');
    }

    setSearchParams(newParams);
  };

  const totalPages = useMemo(
    () =>
      itemsPerPage === 'all'
        ? 1
        : Math.ceil(filteredProductsCount / +itemsPerPage),
    [filteredProductsCount, itemsPerPage],
  );

  const startIndex = useMemo(
    () => (currentPage - 1) * +itemsPerPage,
    [currentPage, itemsPerPage],
  );

  const currentProducts = useMemo(
    () =>
      itemsPerPage === 'all'
        ? filteredProducts
        : filteredProducts.slice(startIndex, startIndex + +itemsPerPage),
    [filteredProducts, itemsPerPage, startIndex],
  );

  return (
    <main className="products">
      {loading && (
        <div className="products__loader">
          <Loader />
        </div>
      )}

      {error && (
        <div className="products__error">
          <span className="products__error-text">{error}</span>
          <button
            className="products__error-button"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="products__breadcrumbs">
            <Breadcrumbs />
          </div>
          <h1 className="products__title">
            {category === 'phones'
              ? 'Mobile phones'
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
          <p className="products__models-count">
            {filteredProductsCount + ' models'}
          </p>

          <div className="products__filters">
            <DropDown
              label="Sort by"
              selected={sortBy}
              options={['age', 'alphabet', 'price']}
              onChange={handleSortChange}
            />

            <DropDown
              label="Items on page"
              selected={itemsPerPage}
              options={['all', '4', '8', '16']}
              onChange={handlePerPageChange}
            />
          </div>

          <div className="products__list">
            <ProductsList products={currentProducts} />
          </div>

          {itemsPerPage !== 'all' && totalPages > 1 && (
            <div className="products__pagination">
              <Pagination
                total={filteredProductsCount}
                perPage={+itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
};
