import React from 'react';
import './Categories.scss';
import { Link } from 'react-router-dom';

export const Categories: React.FC = () => {
  return (
    <section className="category container">
      <h2 className="category__title">Shop by category</h2>

      <div className="category__gadgets">
        <article className="category__phones">
          <Link to="/phones">
            <img
              src="../../../img/category/phones.png"
              alt="phones"
              className="category__phones-img"
            />
            <h4 className="category__phones-title">Mobile phones</h4>
            <p className="category__phones-text">95 models</p>
          </Link>
        </article>
        <article className="category__tablets">
          <Link to="/tablets">
            <img
              src="../../../img/category/tablets.png"
              alt="tablets"
              className="category__tablets-img"
            />
            <h4 className="category__tablets-title">Tablets</h4>
            <p className="category__tablets-text">24 models</p>
          </Link>
        </article>
        <article className="category__accessories">
          <Link to="/accessories">
            <img
              src="../../../img/category/accessories.png"
              alt="accessories"
              className="category__accessories-img"
            />
            <h4 className="category__accessories-title">Accessories</h4>
            <p className="category__accessories-text">100 models</p>
          </Link>
        </article>
      </div>
    </section>
  );
};
