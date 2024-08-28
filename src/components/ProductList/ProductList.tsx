import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ProductCard } from '../ProductCard';
/* import { LimitedProduct } from '../../types/Product'; */
import { DropDown } from '../DropDown';
import { Pagination } from '../Pagination';
import { Loader } from '../Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './ProductList.module.scss';
import { useAppContext } from '../../context/AppContext';
import { Sort } from "../../components/Sort"
import { LimitedProduct } from '../../types/Product';

type ProductListProps = {
  category: string;
  title: string;
};

export const ProductList: React.FC<ProductListProps> = ({ category, title }) => {
  const {numberOfProductsPerPage, sortMethod, products, setProducts} = useAppContext()
/*   const [products, setProducts] = useState<(LimitedProduct)[]>([]); */

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://meljaszuk.github.io/react_phone-catalog/api/products.json`);
        const data = await response.json();
        setProducts(data);
        const copiedData = [...data].filter((itemCategory: LimitedProduct) => itemCategory.category === category);




        if (sortMethod === 'alpha') {
          copiedData.sort((a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name)
          );
        }

        if (sortMethod === 'price') {
          copiedData.sort((a: { price: number }, b: { price: number }) =>
            a.price - b.price
          );
        }

        if (sortMethod === 'newest') {
          copiedData.sort((a: { year: number }, b: { year: number }) =>
            b.year - a.year // Sorting from newest to oldest
          );
        }

        setProducts(copiedData);
        console.log('soreted',sortMethod)

      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();


  }, [sortMethod, category]);





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
