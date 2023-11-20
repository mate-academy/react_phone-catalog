import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import favorite from '../images/favorite.svg';

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/products.json')
      .then((responce) => responce.json())
      .then((productsFromServer) => setProducts(productsFromServer));
  }, []);

  return (
    <div className="products">
      {products.map((product) => (
        <div className="product__card" key={product.id}>
          <div className="card__top">
            <img src={product.imageUrl} alt="product" />
            <p className="product__name">{product.name}</p>
            <p className="product__price">{product.price}</p>
            <p className="product__discount">{product.discount}</p>
          </div>
          <div className="card__bottom">
            <p className="product__screen">{product.screen}</p>
            <p className="product__capacity">{product.capacity}</p>
            <p className="product__ram">{ product.ram}</p>
          </div>
          <a href="/" className="product__add">Add to cart</a>
          <a href="/" className="Product__favorite">
            <img src={favorite} alt="favorite" />
          </a>
        </div>
      ))}
    </div>
  );
};
