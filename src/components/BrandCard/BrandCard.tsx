import React, { useState, useEffect } from 'react';
import './BrandCard.scss';
import {} from '../../../public/api/products.json';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
}

export const BrandCard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [cart, setCart] = useState<Product[]>([]); // Кошик
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products.json');

        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        const data = await response.json();

        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  // Функція для додавання продукту в улюблені
  const addToFavorites = (product: Product) => {
    setFavorites(prevFavorites => [...prevFavorites, product]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="product-cards">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-card__content">
            <div className="product-card__image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-card__image"
              />
            </div>
            <h3 className="product-card__name">{product.name}</h3>
            <p className="product-card__price">${product.price}</p>
            <hr className="product-card__line"></hr>
            <div className="product-card__description">
              <div className="product-card__screen">
                <p className="product-card__description-title">Screen</p>
                <p className="product-card__description-value">
                  {product.screen}
                </p>
              </div>
              <div className="product-card__capacity">
                <p className="product-card__description-title">Capacity</p>
                <p className="product-card__description-value">
                  {product.capacity}
                </p>
              </div>
              <div className="product-card__ram">
                <p className="product-card__description-title">Ram</p>
                <p className="product-card__description-value">{product.ram}</p>
              </div>
            </div>
            <div className="product-card__buttons">
              <button
                className="product-card__button-cart"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
              <button
                className="product-card__button-favourite"
                onClick={() => addToFavorites(product)}
              ></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
