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
/* import {SortMethodTypes} from "../../components/Sort"; */
import { LimitedProduct } from '../../types/Product';

type ProductListProps = {
  category: string;
  title: string;
};

export const ProductList: React.FC<ProductListProps> = ({ category, title }) => {
  const {numberOfProductsPerPage, sortMethod, /* setSortMethod,  */products, setProducts, /* setNumberOfProductsPerPage */} = useAppContext()
  const [displayedPage, setDisplayedPage] = useState(1);
const [isLoading, setIsLoading] = useState(true);


useEffect(()=> {


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
      localStorage.setItem('storedProducts', JSON.stringify(copiedData));


    } catch (error) {
      console.error('Error fetching product data:', error);
    } finally {
      setIsLoading(false)
    }
  };

  fetchProductData();


},[category, sortMethod, setProducts])

useEffect(()=> {
  console .log('XXXXXXXXXXXC',products)
},[])


useEffect(()=> {
  if (products.length === 0) {


    const storedProducts = localStorage.getItem('storedProducts')

    if (storedProducts) {

      const parsedProducts: LimitedProduct[] = JSON.parse(storedProducts);
      console.log(parsedProducts) //*** PRAWIDŁOWO SPARSOWANE */
      setProducts(parsedProducts)
    }
    console.log('PRODUCTS AFTER RFRESHING1',products) //*** WYŚWIETLA SIĘ PUSTA TABLICA */
  }
},[products])


useEffect(()=> {
  console.log('PRODUCTS AFTER RFRESHING2',products) //TU PO CZASIE AKTUALIZUJA SIE PODUCTY Z LCOAL STOAGE. NALEŻY DODAĆ INNE DANNE POBIERANE Z PAMIECI I UZYC ICH W RAZI ODSWIEZENIA
},[products])

useEffect(()=> {
  console.log('SORT METHOD SET TO',sortMethod)
},[sortMethod])


  const numberOfProducts = products.length;

  const numberOfPages = useMemo(() => {
    return Math.ceil(numberOfProducts / numberOfProductsPerPage);
  }, [numberOfProducts, numberOfProductsPerPage]);






  const handleDisplayedPage = useCallback((newState: number) => {
    setDisplayedPage(newState);



  }, [numberOfProductsPerPage]);

useEffect(()=> {
  localStorage.setItem('displayedPage', JSON.stringify(displayedPage));
  console.log('WILL DISPLAY', displayedPage);
},[displayedPage])

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


  useEffect(() => {
    // Sprawdź, czy wyświetlana strona mieści się w nowym zakresie
    if (displayedPage > numberOfPages) {
      setDisplayedPage(numberOfPages);
    }
  }, [numberOfProductsPerPage, numberOfPages, displayedPage]);



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
