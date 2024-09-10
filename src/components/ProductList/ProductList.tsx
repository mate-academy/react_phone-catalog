import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ProductCard } from '../ProductCard';
import { DropDown } from '../DropDown';
import { Pagination } from '../Pagination';
import { Loader } from '../Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './ProductList.module.scss';
import { useAppContext } from '../../context/AppContext';
import { Sort } from '../../components/Sort';
import { fetchProducts } from '../../utils/fetchProducts';

type ProductListProps = {
  category: string;
  title: string;
};

export const ProductList: React.FC<ProductListProps> = ({ category, title }) => {
  const { numberOfProductsPerPage, sortMethod, products, setProducts } = useAppContext();
  const [displayedPage, setDisplayedPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const numberOfPages = useMemo(() => {
    return Math.ceil(products.length / numberOfProductsPerPage);
  }, [products.length, numberOfProductsPerPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setDisplayedPage(1)
  }, []);

  useEffect(() => {
    const element = document.getElementById('list_top');

    if (element && displayedPage !== 1) {
      let offset = 0;
      const width = window.innerWidth;

      if (width <= 639) {
        offset = 55;
      } else if (width >= 640 && width <= 1199) {
        offset = 60;
      } else if (width >= 1200) {
        offset = 70;
      }

      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [displayedPage]);

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      const count = products.length
      const filteredData = await fetchProducts(category, sortMethod, count);
      setProducts(filteredData);
      setDisplayedPage(1);
      setIsLoading(false);
    };

    fetchProductData();
  }, [category, sortMethod, setProducts, numberOfProductsPerPage]);

  const handleDisplayedPage = useCallback((newPage: number) => {
    setDisplayedPage(newPage);
  }, []);

  const firstDisplayedIndexOnPage = useMemo(() => {
    return (displayedPage - 1) * numberOfProductsPerPage;
  }, [displayedPage, numberOfProductsPerPage]);

  const arrayOfDisplayedIndexes = useMemo(() => {
    return products.slice(firstDisplayedIndexOnPage, firstDisplayedIndexOnPage + numberOfProductsPerPage);
  }, [products, firstDisplayedIndexOnPage, numberOfProductsPerPage]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.ProductsPage}>
      <div className={styles.topContainer}>
        <Breadcrumbs category={category} />
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.count}>
          {products.length} items
        </div>

        <div className={styles.controls}>
          <Sort />
          <DropDown numberOfProducts={products.length} />
        </div>
        <ul className={styles.container} id="list_top">
          {arrayOfDisplayedIndexes.map((product) => (
            <li key={product.id} className={styles.product}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        {numberOfPages > 1 && (
          <Pagination
            numberOfPages={numberOfPages}
            handleDisplayedPage={handleDisplayedPage}
            displayedPage={displayedPage}
          />
        )}
      </div>
    </div>
  );
};
