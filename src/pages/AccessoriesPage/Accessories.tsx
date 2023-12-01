import { useEffect, useState } from 'react';
import './AccessoriesPage.scss';
import { Product } from '../../Types/Product';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import home from '../../images/home.svg';
import arrowright from '../../images/arrowright.svg';

export const AccessoriesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/_new/products.json')
      .then((response) => response.json())
      .then((productsFormServer) => setProducts(productsFormServer));
  }, []);

  return (
    <div className="accessories">
      <div className="accessories__top">
        <img src={home} alt="home" />
        <img src={arrowright} alt="arrow" />
        <p className="accessories__top--name">Accessories</p>
      </div>
      <h1 className="accessories__title">Accessories</h1>
      <p className="accessories__count">0 models</p>
      <div className="accessories__filter">
        <div className="accessories__filter--item">
          <p className="accessories__filter--item-name">Sort by</p>
          <select id="filterby" className="accessories__filter--item-select">
            <option value="new">Newest</option>
            <option value="age">Age</option>
            <option value="abc">Alphabet</option>
          </select>
        </div>
        <div className="accessories__filter--item">
          <p className="accessories__filter--item-name">Items on page</p>
          <select id="filterby" className="accessories__filter--item-select">
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </div>
      </div>
      <div className="accessories__catalog">
        {products
          .filter((product) => product.category === 'accessories')
          .map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
};
