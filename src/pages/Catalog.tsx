//#region Imports

import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { fetchProducts } from '../utils/fetchProducts';

import { ProductCart } from '../components/ProductCart';
import { Pagination } from '../components/Pagination';
import { ProductsSort } from '../components/ProductSort';
import { ProductsPerPage } from '../components/ProductPerPage';
import { NavButton } from '../components/NavButton';
import { Loader } from '../components/Loader';
import { ErrorPage } from '../components/ErrorPage';
import { Breadcrumbs } from '../components/Breadcrumbs';

import { Product } from '../types/product';

import styles from '../styles/Catalog.module.scss';

//#endregion

export const Catalog = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { category: categoryName } = useParams();

  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [isItemPerPageOpen, setIsItemPerPageOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState('Newest');
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortOption = searchParams.get('sort') || 'Newest';
  const postPerPage = searchParams.get('perPage') || '4';

  const currentPage = +(searchParams.get('page') || 1);

  const [isError, setIsError] = useState<string | null>(null);

  const loadProducts = async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const products = fetchProducts();

      setAllProducts(products);
    } catch {
      setIsError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePostPerPageChange = (value: number | 'All') => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', String(value));
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(page));
    setSearchParams(params);
  };

  useEffect(() => {
    loadProducts();
  }, [categoryName]);

  useEffect(() => {
    setSelectedOption(sortOption);
  }, [categoryName, sortOption]);

  const filteredProducts = allProducts.filter(product => {
    return product.category === categoryName;
  });

  const getSortedProducts = (productsToSort: Product[], sortBy: string) => {
    const sorted = [...productsToSort];

    switch (sortBy) {
      case 'Newest':
        return sorted.sort((a, b) => b.year - a.year);
      case 'Alphabetically':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'Cheapest':
        return sorted.sort((a, b) => a.fullPrice - b.fullPrice);
      default:
        return sorted;
    }
  };

  const totalProducts = useMemo(() => {
    return getSortedProducts(filteredProducts, sortOption);
  }, [filteredProducts, sortOption]);

  const lastPostIndex =
    postPerPage === 'All'
      ? totalProducts.length
      : currentPage * Number(postPerPage);

  const firstPostIndex =
    postPerPage === 'All' ? 0 : lastPostIndex - Number(postPerPage);

  const sortedProducts = useMemo(() => {
    return totalProducts.slice(firstPostIndex, lastPostIndex);
  }, [totalProducts, firstPostIndex, lastPostIndex]);

  const getTitle = (category: string | undefined) => {
    switch (category) {
      case 'phones':
        return 'Mobile Phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return 'Catalog';
    }
  };

  if (isError) {
    return <ErrorPage reload={loadProducts} />;
  }

  return (
    <div className={styles.catalog}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className={styles.catalog__container}>
              <h2 className={styles.catalog__titleText}>
                There are no {categoryName} yet
              </h2>
            </div>
          ) : (
            <div className={styles.catalog__container}>
              <Breadcrumbs category={categoryName} />

              <div className={styles.catalog__title}>
                <span className={styles.catalog__titleText}>
                  {getTitle(categoryName)}
                </span>
                <span className={styles.catalog__titleNumber}>
                  {filteredProducts.length} models
                </span>
              </div>

              <div className={styles.catalog__filters}>
                <ProductsSort
                  isOpen={isSortByOpen}
                  setIsOpen={setIsSortByOpen}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  sortOption={sortOption}
                  setSortOption={handleSortChange}
                />

                <ProductsPerPage
                  isOpen={isItemPerPageOpen}
                  setIsOpen={setIsItemPerPageOpen}
                  postPerPage={postPerPage}
                  setPostPerPage={handlePostPerPageChange}
                />
              </div>

              <div className={styles.catalog__products}>
                {sortedProducts.map(product => (
                  <ProductCart
                    key={product.id}
                    product={product}
                    isDiscounted={false}
                  />
                ))}
              </div>

              <div className={styles.catalog__paggination}>
                {postPerPage !== 'All' && (
                  <NavButton
                    direction="left"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                )}

                <Pagination
                  totalPosts={totalProducts.length}
                  postsPerPage={postPerPage}
                  setCurrentPage={handlePageChange}
                  currentPage={currentPage}
                />

                {postPerPage !== 'All' && (
                  <NavButton
                    direction="right"
                    disabled={
                      Math.ceil(
                        filteredProducts.length / Number(postPerPage),
                      ) <= currentPage
                    }
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
