import { useLocation, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import React, { useEffect, useMemo, useState } from 'react';
import { Selector } from '../../components/Selector';
import { getAllProducts } from '../../../api/products';
import { ErrorMessage } from '../../../types/ErrorMessage';
import styles from './ProductPage.module.scss';
import { Product } from '../../../types/Product';
import { ProductList } from '../../components/ProductList';
import { Pagination } from '../../components/Pagination';
import { useLoading } from '../../../Context/LoadingContext.js';
import { Loader } from '../../components/Loader/Loader.js';

type Props = {
  isLightMode: boolean;
};

const sortOptions = [
  {
    value: 'newset',
    label: 'Newset',
  },
  {
    value: 'alphabetically',
    label: 'Alphabetically',
  },
  {
    value: 'cheapest',
    label: 'Cheapest',
  },
];

const perPageValues = ['32', '16', '8', '4'];
const perPageOptions = perPageValues.map(option => ({
  value: option,
  label: option,
}));

export const ProductPage: React.FC<Props> = ({ isLightMode }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const location = useLocation();
  const category = location.pathname.replace(/^\//, '');
  const [pageSelector, setPageSelector] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSelector, setCurrentSelector] = useState('');
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get('sort') || 'newset';
  const itemsPerPage = searchParams.get('perPage') || '16';
  const page = searchParams.get('page') || '1';

  const filterProducts = useMemo(() => {
    return allProducts.filter(product => product.category === category);
  }, [allProducts, category]);

  const totalPages = Math.ceil(filterProducts.length / pageSelector);

  useEffect(() => {
    startLoading();
    getAllProducts()
      .then(products => {
        if (!products && products.length === 0) {
          setErrorMessage(ErrorMessage.No_product_on_server);
        } else {
          setAllProducts(products);
        }
      })
      .catch(() => setErrorMessage(ErrorMessage.Other_problems))
      .finally(() => stopLoading());
  }, []);

  useEffect(() => {
    setCurrentPage(+page);
    setPageSelector(+itemsPerPage);
  }, [page, itemsPerPage]);

  const searchLocation = (pathnameCategory: string) => {
    switch (pathnameCategory) {
      case 'phones':
        return 'Mobile phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return '';
    }
  };

  const handlerSortBySelectorChange = (type: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', type);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlerPageSelectorChange = (itemsOnPage: string) => {
    setPageSelector(Number(itemsOnPage));
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);

    newParams.set('perPage', itemsOnPage);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleSetCurrentSelector = (selector: string) => {
    setCurrentSelector(selector);
  };

  const handlerPageSelector = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', pageNumber.toString());
    setSearchParams(newParams);
  };

  const pageCategoryTitle = searchLocation(category);

  const sortedProducts = useMemo(() => {
    const sorted = [...filterProducts];

    switch (sortType) {
      case 'alphabetically':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'cheapest':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'newset':
      default:
        sorted.sort((a, b) => b.year - a.year);
        break;
    }

    return sorted;
  }, [filterProducts, sortType]);

  const startIndex = (currentPage - 1) * pageSelector;
  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + pageSelector,
  );

  return (
    <main className={styles.products}>
      {isLoading && allProducts.length === 0 && <Loader />}
      {!isLoading && !errorMessage && (
        <>
          <div className={styles.products__container}>
            <Breadcrumbs product={null} isLightMode={isLightMode} />
            <h1 className={styles.products__title}>{pageCategoryTitle}</h1>
            <span className={styles['products__models-count']}>
              {filterProducts.length} models
            </span>
            <div className={styles.products__selector}>
              <Selector
                id={'sortBy'}
                label={'Sort by'}
                initialSelectorType={
                  sortOptions.find(option => option.value === sortType)
                    ?.label || 'Newset'
                }
                options={sortOptions}
                selector={currentSelector}
                onChange={handlerSortBySelectorChange}
                setCurrentSelector={handleSetCurrentSelector}
              />

              <Selector
                id={'pageSelector'}
                label={'Items on page'}
                initialSelectorType={
                  perPageOptions.find(option => option.value === itemsPerPage)
                    ?.label || '16'
                }
                options={perPageOptions}
                selector={currentSelector}
                onChange={handlerPageSelectorChange}
                setCurrentSelector={handleSetCurrentSelector}
              />
            </div>
            <ProductList products={visibleProducts} isLightMode={isLightMode} />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              isLightMode={isLightMode}
              handlerPageSelector={handlerPageSelector}
            />
          </div>
        </>
      )}
    </main>
  );
};
