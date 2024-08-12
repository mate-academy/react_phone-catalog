import React, { useEffect, useState } from 'react';

export const ProductList2: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);


  useEffect(() => {
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
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
    )
      } else {
        return (
          <div>Loading</div>
        )
        }
      }

