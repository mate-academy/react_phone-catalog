import React, { useEffect, useState } from 'react';

// Define the Product and Products types
interface Product {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

interface Products {
  itemsArray: Product[];
}

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Ustawienie na pustą tablicę

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await fetch('./api/phones.json');
      console.log('response', response)
      const data: Products = await response.json();

      if (data.itemsArray) {
        setProducts(data.itemsArray);
      } else {
        console.error('itemsArray is undefined');
      }

      console.log('response.json', response)
      setProducts(data.itemsArray); // id unedefined
      console.log('data', data.itemsArray) // is undefined
    };

    fetchProductData();
  }, []); // Użycie pustej tablicy
  console.log('products', products) //is undefined

  if (products !== undefined) {
    return (
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    );
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
};
