import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { ProductPhone, ProductTablet, ProductAccessory } from '../../types/Product';
import { DropDown } from '../DropDown';
import { Pagination } from '../Pagination';
import styles from './ProductList.module.scss';

type ProductListProps = {
  category: string;
}

export const ProductList: React.FC<ProductListProps> = ( {category}) => {
    const [products, setProducts] = useState<(ProductPhone | ProductTablet | ProductAccessory)[]>([]);


  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`../../API/${category}.json`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();


  }, [category]);

  console.log('products after fetch:', products); // Log products after fetch
  let numberOfProducts = products.length;

  const [numebrOfProductsPerPage, setnumebrOfProductsPerPage] = useState(16)
  let numberOfPages = Math.ceil(numberOfProducts / numebrOfProductsPerPage)

  let [displayedPage, setDisplayedPage] = useState(1);
  const handleDisplayedPage = (newState: number) => {
    setDisplayedPage(newState)
    console.log('WILL DISPLAY',newState)
  }

  const handleNumberOdProductPerPage = (newState: number) => {
    setnumebrOfProductsPerPage(newState)
  }




  let firstDisplayedIndexOnPage = (displayedPage - 1) * numebrOfProductsPerPage;
  let arrayOfDisplayedIndexes = [];

  for (let i = firstDisplayedIndexOnPage; i < firstDisplayedIndexOnPage + numebrOfProductsPerPage; i++) {
    arrayOfDisplayedIndexes.push(products[i])

    if (arrayOfDisplayedIndexes[arrayOfDisplayedIndexes.length-1] === undefined) {
      arrayOfDisplayedIndexes.pop();
      break;
    }
  }

  console.log('array of display indexes',arrayOfDisplayedIndexes)

  if (products.length === 0) {
    return <div>Loading...</div>;
  }



  return (
    <div className={styles.ProductsPage}>
      <DropDown handleNumberOdProductPerPage={handleNumberOdProductPerPage} numberOfProducts={numberOfProducts}/>

      <ul className={styles.container}>
        {arrayOfDisplayedIndexes.map((product) => (
          <li key={product.id} className={styles.product}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <Pagination numberOfPages = {numberOfPages} handleDisplayedPage={handleDisplayedPage} displayedPage={displayedPage} />
    </div>
  );
};
