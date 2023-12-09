import { useState, useEffect } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching product list:', error));
  }, []);

  return products;
};

export default useProducts;
