import React, { useContext, useState, useMemo, useEffect } from 'react';
import './ProductPage.scss';
import { Dropdown } from '../shared/Dropdown';
import { Pagination } from '../shared/Pagination';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../store/GlobalContext';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { ProductsList } from '../shared/ProductsList';
import { Loader } from '../shared/Loader';
import { Product } from '../../types/Product';

export const getPreparedProducts = (
  products: Product[],
  { sortBy, query }: { sortBy: string; query: string },
): Product[] => {
  let filteredProducts = [...products];

  if (!!query.length) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  switch (sortBy) {
    case 'Newest':
      return filteredProducts.sort((a, b) => b.year - a.year);
    case 'Alphabetically':
      return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'Cheapest':
      return filteredProducts.sort((a, b) => a.fullPrice - b.fullPrice);
    default:
      return filteredProducts;
  }
};

export const ProductPage: React.FC = () => {
  const { products, sortBy, setSortBy, query } = useContext(GlobalContext);

  const [itemsPerPage, setItemsPerPage] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // Добавлено состояние для ошибок

  const { productsType } = useParams<{ productsType: string }>();

  const normalizeProductsType =
    productsType &&
    productsType.charAt(0).toUpperCase() + productsType.slice(1);

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const categoryProducts = useMemo(() => {
    return products.filter(product => product.category === productsType);
  }, [products, productsType]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query); // Обновляем debouncedQuery после задержки
    }, 1000); // Задержка 1 секунда

    return () => clearTimeout(timeout); // Очистка таймера при каждом изменении query
  }, [query]);

  // Используем debouncedQuery для фильтрации
  const visibleProducts = useMemo(() => {
    return getPreparedProducts(categoryProducts, {
      sortBy,
      query: debouncedQuery, // Используем debouncedQuery с задержкой
    });
  }, [debouncedQuery, categoryProducts, sortBy]);

  // const visibleProducts = useMemo(() => {
  //   return getPreparedProducts(categoryProducts, {
  //     sortBy,
  //     query,
  //   });
  // }, [categoryProducts, sortBy, query]);

  const countVisibleProducts = visibleProducts.length;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false); // Сброс состояния ошибки перед началом загрузки

    // Эмуляция загрузки данных
    setTimeout(() => {
      try {
        // Если все прошло успешно
        setIsLoading(false);
      } catch (error) {
        // Если произошла ошибка, выбрасываем новую ошибку
        throw new Error('Произошла ошибка при загрузке данных');
      }
    }, 1000);

    setSortBy('Newest');
    setItemsPerPage('All');
  }, [productsType, setSortBy]);

  const handleReload = () => {
    setIsLoading(true);
    setHasError(false);

    // Повторная попытка загрузки данных
    setTimeout(() => {
      try {
        setIsLoading(false);
      } catch (error) {
        // console.error(error);
        setHasError(true);
        setIsLoading(false);
      }
    }, 1000);
  };

  const totalPages =
    itemsPerPage === 'All'
      ? 1
      : Math.ceil(countVisibleProducts / Number(itemsPerPage));

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * Number(itemsPerPage);
  const currentItems =
    itemsPerPage === 'All'
      ? visibleProducts
      : visibleProducts.slice(startIndex, startIndex + Number(itemsPerPage));

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setQuery(query); // Обновляем query в глобальном контексте
  //   }, 1000); // Задержка 1 секунда

  //   return () => clearTimeout(timeout); // Очистка таймера при каждом изменении query
  // }, [query, setQuery]); // Зависимость от query

  return (
    <div className="productPage">
      {isLoading && <Loader />}
      {hasError && (
        <div className="productPage__error">
          <p>Something went wrong. Please try again.</p>
          <button onClick={handleReload} className="productPage__reloadButton">
            Reload
          </button>
        </div>
      )}
      {!isLoading && !hasError && (
        <>
          <Breadcrumbs productType={productsType!} />
          {/* Как здесь можно переделать с undefind */}

          <h1 className="productPage__title">{normalizeProductsType}</h1>

          <span className="productPage__description">
            {`${countVisibleProducts} ${
              countVisibleProducts === 1 ? 'model' : 'models'
            }`}
          </span>

          <div className="productPage__dropdown-container">
            <Dropdown
              label="Sort by"
              selected={sortBy}
              options={['Newest', 'Alphabetically', 'Cheapest']}
              onChange={value => setSortBy(value)}
              className="productPage__dropdown--sortBy"
              width="176px"
            />
            <Dropdown
              label="Items on page"
              selected={itemsPerPage}
              options={['4', '8', '16', 'All']}
              onChange={value => {
                setItemsPerPage(value);
                setCurrentPage(1);
              }}
              className="productPage__dropdown--itemsOnPage"
              width="128px"
            />
          </div>

          <ProductsList products={currentItems} displayType={'with-discount'} />

          {itemsPerPage !== 'All' && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
