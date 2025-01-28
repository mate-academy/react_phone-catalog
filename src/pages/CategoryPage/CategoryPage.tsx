import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Category } from '../../types/CategoryEnum';
import { Product } from '../../types/ProductsType';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api';
import { Loader } from '../../components/Loader';
import { UserHints } from '../../components/UserHints';
import { SortByName } from '../../types/SortByName';
import { SortByCount } from '../../types/SortByCount';
// eslint-disable-next-line max-len
import { SortBlock } from '../../components/CategoryPageComponents/SortBlock';
// eslint-disable-next-line max-len
import { ProductsList } from '../../components/CategoryPageComponents/ProductsList';
import { Pagination } from '../../components/CategoryPageComponents/Pagination';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortName = searchParams.get('sortName') || SortByName.newest;
  const sortCount = searchParams.get('sortCount') || SortByCount.all;
  const currentPage = Number(searchParams.get('currentPage')) || 0;

  const [products, setProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sortByNameMenuRef = useRef<HTMLDivElement | null>(null);
  const sortByCountMenuRef = useRef<HTMLDivElement | null>(null);

  const isExcludedCategory = category !== Category.favourites.toLowerCase();

  useEffect(() => {
    setLoader(true);
    setErrorMessage('');

    getProducts()
      .then(loadedProducts => {
        if (isExcludedCategory) {
          return loadedProducts.filter(
            product => product.category === category,
          );
        } else {
          const localIds = JSON.parse(
            localStorage.getItem('favourites') || '[]',
          );

          return loadedProducts.filter(product =>
            localIds.includes(product.itemId),
          );
        }
      })
      .then(loadProducts => {
        if (loadProducts) {
          setProducts(loadProducts);
        }
      })
      .catch(er => {
        setErrorMessage('Ошибка загрузки данных!');
        throw new Error((er as Error).message || 'An unknown error occurred');
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const titlePage = useMemo(() => {
    switch (category?.toLowerCase()) {
      case Category.phones.toLowerCase():
        return 'Mobile phones';
      case Category.tablets.toLowerCase():
        return 'Tablets';
      case Category.accessories.toLowerCase():
        return 'Accessories';
      case Category.favourites.toLowerCase():
        return 'Favourites';
      default:
        return '';
    }
  }, [category]);

  const paginatedProducts = useMemo(() => {
    const chunkArray = (array: Product[], size: number | string) => {
      const chunkSize = size === 'All' ? array.length : Number(size);

      if (isNaN(chunkSize) || chunkSize <= 0) {
        return [];
      }

      const result = [];

      for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
      }

      return result;
    };

    const sortedProducts = [...products].sort((a, b) => {
      switch (sortName) {
        case SortByName.newest:
          return b.year - a.year;
        case SortByName.alphabetically:
          return a.name.localeCompare(b.name);
        case SortByName.cheapest:
          return a.price - b.price;
        default:
          return 0;
      }
    });

    return chunkArray(sortedProducts, sortCount);
  }, [products, sortName, sortCount]);

  return (
    <>
      <UserHints />
      <div className="category-page">
        {loader ? (
          <Loader />
        ) : errorMessage ? (
          errorMessage
        ) : (
          <div className="category-page__content">
            {/* Выбор сортировки */}
            <div className="category-page__block">
              <div className="category-page__info">
                <div className="category-page__title">{titlePage}</div>

                <div className="category-page__count-models">
                  {products.length} {isExcludedCategory ? 'models' : 'items'}
                </div>

                {isExcludedCategory ? (
                  <SortBlock
                    sortCount={sortCount}
                    sortName={sortName}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    sortByNameMenuRef={sortByNameMenuRef}
                    sortByCountMenuRef={sortByCountMenuRef}
                  />
                ) : null}
              </div>
            </div>

            {/* Рендер продуктов */}
            <ProductsList
              products={products}
              paginatedProducts={paginatedProducts}
              currentPage={currentPage}
              setProducts={setProducts}
            />

            {/* Пагинация */}
            {isExcludedCategory ? (
              <Pagination
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                currentPage={currentPage}
                paginatedProducts={paginatedProducts}
              />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};
