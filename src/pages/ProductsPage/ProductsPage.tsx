import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import styles from './ProductsPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { Category } from '../../types/Category';
import { useParams, useSearchParams } from 'react-router-dom';
import { DropDown } from './components/DropDown';
import { getSortedProducts } from '../../utils/getSortedProducts';
import { getPaginatedProducts } from '../../utils/getPaginatedProducts';
import { CustomButton } from './components/CustomButtons';

export const ProductsPage = () => {
  const { products } = useProducts();
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const itemCategory = category as Category;

  const filteredByCategory = products.filter(
    product => product.category === itemCategory,
  );

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const defaultParams = {
    sortField: 'year',
    count: `${filteredByCategory.length}`,
    page: '1',
  };

  const sortOptions = {
    [defaultParams.sortField]: 'Newest',
    name: 'Alphabetically',
    price: 'Cheapest',
  };

  const itemsOptions = {
    [defaultParams.count]: 'All',
    '16': '16',
    '8': '8',
    '4': '4',
  };

  const sortField = searchParams.get('sortField') || defaultParams.sortField;
  const count = searchParams.get('count') || defaultParams.count;
  const page = Number(searchParams.get('page')) || Number(defaultParams.page);
  const totalPages =
    count === 'All' ? 1 : Math.ceil(filteredByCategory.length / Number(count));
  const sortedProducts = getSortedProducts(filteredByCategory, sortField);

  const handleSortChange = (option: string) => {
    const updatedParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...updatedParams, sortField: option });
  };

  const handleItemsChange = (option: string) => {
    const updatedParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...updatedParams, count: option, page: '1' });
  };

  const paginatedProducts =
    count === 'All'
      ? sortedProducts
      : getPaginatedProducts(sortedProducts, page, Number(count));

  const getPageNumbers = () => {
    const range = 3;
    const groupStart = Math.floor((page - 1) / range) * range + 1;
    const groupEnd = Math.min(totalPages, groupStart + range - 1);

    const pages = [];
    for (let i = groupStart; i <= groupEnd; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: newPage.toString(),
    });
  };

  const handleNextPage = () => {
    if (page <= totalPages) {
      handlePageChange(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page >= 1) {
      handlePageChange(page - 1);
    }
  };

  const pageNumbers = getPageNumbers();
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  return (
    <div className={styles.products}>
      <div className={styles.products__breadcrumbs}>lalala</div>
      <h1 className={styles.products__title}>
        {capitalizeFirstLetter(itemCategory)}
      </h1>
      <p className={styles.products__count}>
        {`${filteredByCategory.length} models`}
      </p>

      {!filteredByCategory.length ? (
        <h2 className={styles.products__items}>
          There are no {itemCategory} yet
        </h2>
      ) : (
        <>
          <div className={styles.filters}>
            <div className={styles.products__filters}>
              <p className={styles.products__name}>Sort by</p>
              <DropDown
                options={sortOptions}
                value={sortOptions[sortField]}
                onOptionSelect={handleSortChange}
              />
            </div>

            <div className={styles.products__filters}>
              <p className={styles.products__name}>Items on page</p>
              <DropDown
                options={itemsOptions}
                value={itemsOptions[count]}
                onOptionSelect={handleItemsChange}
              />
            </div>
          </div>
          <div className={styles.products__product}>
            {paginatedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                path={`/product/${product.id}`}
                checkPrice
              />
            ))}
          </div>
          {count !== 'All' && totalPages > 1 && (
            <div className={styles.paginateWrapper}>
              <div className={styles.paginate}>
                <div className={styles.paginate__btn}>
                  <CustomButton
                    iconType="arrowPrev"
                    disabled={isPrevDisabled}
                    onClick={handlePrevPage}
                  />
                </div>

                <div className={styles.paginate__pages}>
                  {pageNumbers.map(num => (
                    <button
                      key={num}
                      className={`${styles.paginate__page} ${num === page ? styles.active : ''}`}
                      onClick={() => handlePageChange(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className={styles.paginate__btn}>
                  <CustomButton
                    iconType="arrowNext"
                    disabled={isNextDisabled}
                    onClick={handleNextPage}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
