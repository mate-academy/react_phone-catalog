import { useEffect, useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { getProducts } from '../../utils/api';
import { Product } from '../../types/Product';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsFromApi = await getProducts('/products.json');

        setProducts(productsFromApi);
      } catch (error) {
        // console.log('error', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {products.map(product => (
        <ProductCard key={product.id} />
      ))}
    </>
  );
};
