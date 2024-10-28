import React, { useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product } from '../../types/ProductCard';
import { useState } from 'react';
// import packageJson from '../../../public/api/products.json';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('../../../public/api/products.json');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="products-list">
        {products.length === 0 ? (
          <div>There are no products available yet.</div>
        ) : (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
