import { useEffect, useState } from 'react';
import './TabletPage.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import home from '../../images/home.svg';
import arrowright from '../../images/arrowright.svg';

export const TabletPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/_new/products.json')
      .then((response) => response.json())
      .then((productsFormServer) => setProducts(productsFormServer));
  }, []);

  return (
    <div className="tablets">
      <div className="tablets__top">
        <img src={home} alt="home" />
        <img src={arrowright} alt="arrow" />
        <p className="tablets__top--name">Tablets</p>
      </div>
      <h1 className="tablets__title">Tablets</h1>
      <p className="tablets__count">0 models</p>
      <div className="tablets__filter">
        <div className="tablets__filter--item">
          <p className="tablets__filter--item-name">Sort by</p>
          <select id="filterby" className="tablets__filter--item-select">
            <option value="new">Newest</option>
            <option value="age">Age</option>
            <option value="abc">Alphabet</option>
          </select>
        </div>
        <div className="tablets__filter--item">
          <p className="tablets__filter--item-name">Items on page</p>
          <select id="filterby" className="tablets__filter--item-select">
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </div>
      </div>
      <div className="tablets__catalog">
        {products.filter((product) => product.category === 'tablets')
          .map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
};
