/* import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard'; */
/* import { Product } from '../../types/Product'; */

/* type ProductCardProps = {
  product: Product; // Oczekiwany typ
}; */

/* export const ProductList: React.FC<ProductCardProps> = ({product}) => {
  const [products, setProducts] = useState<any[]>([]); */


  /* useEffect(() => {
    const fetchProductData = async () => {

        const response = await fetch('../../api/phones.json');
        const data = await response.json();
        setProducts(data);
    };

    fetchProductData();
  }, []);

  console.log('products after fetch:', products); // Log products after fetch
  if (products !== undefined) {


    return (


    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
    )
      } else {
        return (
          <div>Loading</div>
        )
        }
      }




 */
