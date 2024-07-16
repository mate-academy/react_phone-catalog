import React, { useEffect, useState } from 'react';

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);


  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('../../api/phones.json');
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data
        setProducts(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
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

