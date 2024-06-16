import React from 'react';
import './Categories.scss';
import { Link } from 'react-router-dom';

interface Props {
  phoneLength: number;
  tabletsLength: number;
  accessoriesLength: number;
}

export const Categories: React.FC<Props> = ({ phoneLength, tabletsLength, accessoriesLength }) => {
  return (
    <section className="category container">
      <h2 className="category__title">Shop by category</h2>

      <div className="category__gadgets">
        <article className="category__phones">
          <Link to="/product/phones">
            <img
              src="../../../img/category/phones.png"
              alt="phones"
              className="category__phones-img"
            />
            <h4 className="category__phones-title">Mobile phones</h4>
            <p className="category__phones-text">{phoneLength} models</p>
          </Link>
        </article>
        <article className="category__tablets">
          <Link to="/product/tablets">
            <img
              src="../../../img/category/tablets.png"
              alt="tablets"
              className="category__tablets-img"
            />
            <h4 className="category__tablets-title">Tablets</h4>
            <p className="category__tablets-text">{tabletsLength} models</p>
          </Link>
        </article>
        <article className="category__accessories">
          <Link to="/product/accessories">
            <img
              src="../../../img/category/accessories.png"
              alt="accessories"
              className="category__accessories-img"
            />
            <h4 className="category__accessories-title">Accessories</h4>
            <p className="category__accessories-text">{accessoriesLength} models</p>
          </Link>
        </article>
      </div>
    </section>
  );
};
