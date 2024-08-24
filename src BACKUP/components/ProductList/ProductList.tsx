import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ProductCard } from '../ProductCard';
import { ProductPhone, ProductTablet, ProductAccessory } from '../../types/Product';
import { DropDown } from '../DropDown';
import { Pagination } from '../Pagination';
import { Loader } from '../Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './ProductList.module.scss';
import { useAppContext } from '../../context/AppContext';
import { Sort } from "../../components/Sort"

type ProductListProps = {
  category: string;
  title: string;
};

export const ProductList: React.FC<ProductListProps> = ({ category, title }) => {
  const {numberOfProductsPerPage, sortMethod} = useAppContext()
  const [products, setProducts] = useState<(ProductPhone | ProductTablet | ProductAccessory)[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://meljaszuk.github.io/react_phone-catalog/api/${category}.json`);
        const data = await response.json();
        setProducts(data);
        console.log('FETCHED PRODUCTS', data)
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [category]);

  useEffect(() => {
    if (sortMethod === 'alpha') {
      let copiedProducts = [...products];
      const callback = (a: {name: string},b: {name: string}) => a.name.localeCompare(b.name);
      copiedProducts.sort(callback)
      /* setProducts(copiedProducts) */
      console.log('sorted')
    }

    if (sortMethod === 'price') {
      let copiedProducts = [...products]
      const callback = (a: {priceDiscount: number}, b: {priceDiscount: number}) => a > b ? 1 : a < b ? -1 : 0;
      copiedProducts.sort(callback)
      /* setProducts(copiedProducts) */
      console.log('sorted')
    }

  }, [products,sortMethod])

  const numberOfProducts = products.length;

  const numberOfPages = useMemo(() => {
    return Math.ceil(numberOfProducts / numberOfProductsPerPage);
  }, [numberOfProducts, numberOfProductsPerPage]);

  const [displayedPage, setDisplayedPage] = useState(1);

  const handleDisplayedPage = useCallback((newState: number) => {
    setDisplayedPage(newState);
    console.log('WILL DISPLAY', newState);
  }, []);

  const firstDisplayedIndexOnPage = (displayedPage - 1) * numberOfProductsPerPage;

  const arrayOfDisplayedIndexes = useMemo(() => {
    const indexes = [];

    for (let i = firstDisplayedIndexOnPage; i < firstDisplayedIndexOnPage + numberOfProductsPerPage; i++) {
      if (products[i] !== undefined) {
        indexes.push(products[i]);
      } else {
        break;
      }
    }
    return indexes;
  }, [products, firstDisplayedIndexOnPage, numberOfProductsPerPage]);

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

        <Sort />
        <DropDown numberOfProducts={numberOfProducts} />

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
