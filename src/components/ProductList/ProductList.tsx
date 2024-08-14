import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ProductCard } from '../ProductCard';
import { ProductPhone, ProductTablet, ProductAccessory } from '../../types/Product';
import { DropDown } from '../DropDown';
import { Pagination } from '../Pagination';
import { Loader } from '../Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './ProductList.module.scss';

type ProductListProps = {
  category: string;
  title: string;
};

export const ProductList: React.FC<ProductListProps> = ({ category, title }) => {
  const [products, setProducts] = useState<(ProductPhone | ProductTablet | ProductAccessory)[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://meljaszuk.github.io/react_phone-catalog/api/${category}.json`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [category]);

  const numberOfProducts = products.length;

  const [numebrOfProductsPerPage, setnumebrOfProductsPerPage] = useState(16);

  const numberOfPages = useMemo(() => {
    return Math.ceil(numberOfProducts / numebrOfProductsPerPage);
  }, [numberOfProducts, numebrOfProductsPerPage]);

  const [displayedPage, setDisplayedPage] = useState(1);

  const handleDisplayedPage = useCallback((newState: number) => {
    setDisplayedPage(newState);
    console.log('WILL DISPLAY', newState);
  }, []);

  const handleNumberOdProductPerPage = useCallback((newState: number) => {
    setnumebrOfProductsPerPage(newState);
  }, []);

  const firstDisplayedIndexOnPage = (displayedPage - 1) * numebrOfProductsPerPage;

  const arrayOfDisplayedIndexes = useMemo(() => {
    const indexes = [];
    for (let i = firstDisplayedIndexOnPage; i < firstDisplayedIndexOnPage + numebrOfProductsPerPage; i++) {
      if (products[i] !== undefined) {
        indexes.push(products[i]);
      } else {
        break;
      }
    }
    return indexes;
  }, [products, firstDisplayedIndexOnPage, numebrOfProductsPerPage]);

  if (products.length === 0) {
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
        <DropDown handleNumberOdProductPerPage={handleNumberOdProductPerPage} numberOfProducts={numberOfProducts} />
        <ul className={styles.container}>
          {arrayOfDisplayedIndexes.map((product) => (
            <li key={product.id} className={styles.product}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <Pagination
          numberOfPages={numberOfPages}
          handleDisplayedPage={handleDisplayedPage}
          displayedPage={displayedPage}
        />
      </div>
    </div>
  );
};
