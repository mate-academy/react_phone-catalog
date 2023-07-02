import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './PhonesPage.scss';

import Select from '../../components/select/Select';
import Pagination from '../../components/pagination/Pagination';
import ProductList from '../../components/productList/ProductList';
import { perpage, sorting } from '../../helpers/Constants';
import { getProducts } from '../../helpers/Requests';
import { Product } from '../../types/Product';
import { ReactComponent as Home } from '../../icons/Home.svg';

import { ReactComponent as ArrowRight }
  from '../../icons/Chevron (Arrow Right).svg';
import { useSearchContext } from '../../context/searchContext/SearchContext';
import NoResults from '../../components/noResults/NoResults';
import Loader from '../../components/loader/Loader';

const PhonesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    query,
    sortBy,
    perPage,
    setSortBy,
    setPerPage,
    currentPage,
    setCurrentPage,
  } = useSearchContext();

  const itemsFrom = (perPage.length && perPage !== 'All')
    ? (currentPage - 1) * Number(perPage)
    : 0;

  const itemsTo = (perPage.length && perPage !== 'All')
    ? currentPage * Number(perPage)
    : products.length;

  const getProductsFromServer = async () => {
    try {
      const fetchedProducts = await getProducts();

      setProducts(fetchedProducts);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  const paginateProducts = useCallback((
    items: Product[],
    from: number,
    to: number,
  ) => (
    items.slice(from, to)
  ), []);

  const sortProducts = useCallback((items: Product[]) => {
    switch (sortBy) {
      case 'Newest':
        return [...items].sort((a, b) => b.year - a.year);

      case 'Price':
        return [...items].sort((a, b) => a.price - b.price);

      case 'Name':
        return [...items].sort((a, b) => a.name.localeCompare(b.name));

      default:
        return items;
    }
  }, [sortBy]);

  const filterProducts = useCallback((items: Product[]) => (
    items.filter(item => (
      item.name
        .toLowerCase()
        .includes(query.toLowerCase())
    ))), [query, currentPage]);

  const getProductsList = useCallback(() => {
    if (query) {
      return {
        collection: paginateProducts(
          sortProducts(filterProducts(products)),
          itemsFrom,
          itemsTo,
        ),
        totalCount: filterProducts(products).length,
      };
    }

    return {
      collection: paginateProducts(
        sortProducts(products),
        itemsFrom,
        itemsTo,
      ),
      totalCount: products.length,
    };
  }, [products, itemsFrom, itemsTo, sortBy, query]);

  useEffect(() => {
    getProductsFromServer();
  }, []);

  if (query && !getProductsList().totalCount) {
    return <NoResults title="Phones" />;
  }

  return (
    <section
      data-cy="productList"
      className={classNames('catalog', {
        'is-loading': isLoading,
      })}
    >
      <div className="catalog-nav">
        <Link to="/">
          <Home className="catalog-nav-icon" />
        </Link>

        <ArrowRight className="catalog-icon" />

        <span className="catalog-nav-page">Phones</span>
      </div>

      <div className="catalog-title">
        <h2 className="title">Mobile phones</h2>

        {getProductsList().totalCount > 0 && (
          <h3 className="subtitle">
            {getProductsList().totalCount}
          </h3>
        )}
      </div>

      {isLoading
        ? <Loader />
        : (
          <>
            {filterProducts(products).length > 4 && (
              <div className="catalog-filters">
                <Select
                  className="sorting"
                  options={sorting}
                  value={sortBy}
                  onSelect={setSortBy}
                  setPage={setCurrentPage}
                />

                <Select
                  data-cy="pagination"
                  className="perpage"
                  options={perpage}
                  value={perPage}
                  onSelect={setPerPage}
                  setPage={setCurrentPage}
                />
              </div>
            )}

            <ProductList
              styles="catalog-items-list"
              products={getProductsList().collection}
            />

            {filterProducts(products).length > 4 && (
              <Pagination
                perPage={perPage}
                currentPage={currentPage}
                onSelect={setCurrentPage}
                totalCount={getProductsList().totalCount}
              />
            )}
          </>
        )}
    </section>
  );
};

export default PhonesPage;
