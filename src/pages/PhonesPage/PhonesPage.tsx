import { useEffect, useState } from 'react';
import './PhonesPage.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import home from '../../images/home.svg';
import arrowright from '../../images/arrowright.svg';

export const PhonesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/_new/products.json')
      .then(response => response.json())
      .then(productsFormServer => setProducts(productsFormServer));
  }, []);

  products.filter(product => product.category === 'phones');

  return (
    <div className="phones">
      <div className="phones__top">
        <img src={home} alt="home" />
        <img src={arrowright} alt="arrow" />
        <p className="phones__top--name">Phones</p>
      </div>
      <h1 className="phones__title">Mobile phones</h1>
      <p className="phones__count">{`${products.length} models`}</p>
      <div className="phones__filter">
        <div className="phones__filter--item">
          <p className="phones__filter--item-name">Sort by</p>
          <select id="filterby" className="phones__filter--item-select">
            <option value="new">Newest</option>
            <option value="age">Age</option>
            <option value="abc">Alphabet</option>
          </select>
        </div>
        <div className="phones__filter--item">
          <p className="phones__filter--item-name">Items on page</p>
          <select id="filterby" className="phones__filter--item-select">
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </div>
      </div>
      <div className="phones__catalog">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
