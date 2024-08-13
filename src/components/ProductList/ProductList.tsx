import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { ProductPhone, ProductTablet, ProductAccessory } from '../../types/Product';
import { DropDown } from '../DropDown';
import { Pagination } from '../Pagination';

type ProductListProps = {
  category: string;
}

export const ProductList: React.FC<ProductListProps> = ( {category}) => {
  const [products, setProducts] = useState<(ProductPhone | ProductTablet | ProductAccessory)[]>([]);


  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`../../api/${category}.json`);
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
  let numebrOfProductsPerPage = 20; //LINK WITH DROPDOWN LATER
  let numberOfPages = Math.ceil(numberOfProducts / numebrOfProductsPerPage)

  const [displayedPage, setDisplayedPage] = useState(1);
  const handleDisplayedPage = (newState: number) => {
    setDisplayedPage(newState)
    console.log('WILL DISPLAY',newState)
  }



  let firstDisplayedIndexOnPage = (displayedPage - 1) * numebrOfProductsPerPage;
  let arrayOfDisplayedIndexes = [];

  for (let i = firstDisplayedIndexOnPage; i < firstDisplayedIndexOnPage + numebrOfProductsPerPage; i++) {
    arrayOfDisplayedIndexes.push(i)
  }

  console.log('array of diplay indexes',arrayOfDisplayedIndexes)

  if (products.length === 0) {
    return <div>Loading...</div>;
  }



  return (
    <div>
      <DropDown />

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <Pagination numberOfPages = {numberOfPages} handleDisplayedPage={handleDisplayedPage}/>
    </div>
  );
};
