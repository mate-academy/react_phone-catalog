import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ProductCard } from '../ProductCard';
import { DropDown } from '../DropDown';
import { Pagination } from '../Pagination';
import { Loader } from '../Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './ProductList.module.scss';
import { useAppContext } from '../../context/AppContext';
import { Sort } from '../../components/Sort';
import { LimitedProduct } from '../../types/Product';

type ProductListProps = {
  category: string;
  title: string;
};

export const ProductList: React.FC<ProductListProps> = ({ category, title }) => {
  const { numberOfProductsPerPage, sortMethod, products, setProducts } = useAppContext();
  const [displayedPage, setDisplayedPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize number of pages based on products length and numberOfProductsPerPage
  const numberOfPages = useMemo(() => {
    return Math.ceil(products.length / numberOfProductsPerPage);
  }, [products.length, numberOfProductsPerPage]);

  // Fetch and sort products
  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://meljaszuk.github.io/react_phone-catalog/api/products.json');
        const data: LimitedProduct[] = await response.json();

        // Filter products by category
        const filteredData = data.filter((item) => item.category === category);

        // Sort products based on sortMethod
        switch (sortMethod) {
          case 'alpha':
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'price':
            filteredData.sort((a, b) => a.price - b.price);
            break;
          case 'newest':
            filteredData.sort((a, b) => b.year - a.year);
            break;
        }

        setProducts(filteredData);
        setDisplayedPage(1); // Reset to first page after filtering/sorting
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setIsLoading(false);
      }
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

  // Render loading state
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

        <Sort />
        <DropDown numberOfProducts={products.length} />

        <ul className={styles.container}>
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
