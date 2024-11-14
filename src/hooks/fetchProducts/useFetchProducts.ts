import { useState, useEffect } from "react"
import { Product } from "../../types/Product"

export const useFetchProducts = (category: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const baseUrl =
        window.location.hostname === 'localhost'
          ? 'http://localhost:5173/api'
          : 'https://anastasiiakorolko.github.io/react_phone-catalog/api';

        const resolve = await fetch(`${baseUrl}/products.json`);

        if (!resolve.ok) {
          throw new Error('There are no products yet');
        }

        const data = await resolve.json();
        const filteredProducts = data.filter(
          (product: Product) => product.category === category,
        );

        setProducts(filteredProducts);
      } catch (error) {
        setError('There are no products yet');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);
  return { products, loading, error };

}


