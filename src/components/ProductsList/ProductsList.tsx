import React from 'react';
import { Link } from 'react-router-dom';

const ProductsList: React.FC = () => {
  return (
    <div className="list margin__top">
      <h1 className="list__title">Shop by category</h1>

      <ul className="list__list">
        <li className="list__item">
          <Link to="/phones" className="list__link list__link--phones"></Link>

          <h3 className="list__title list__title-link">Mobile phones</h3>

          <span className="list__count">43 models</span>
        </li>

        <li className="list__item">
          <Link to="/tablets" className="list__link list__link--tablets"></Link>

          <h3 className="list__title list__title-link">Mobile phones</h3>

          <span className="list__count">43 models</span>
        </li>

        <li className="list__item">
          <Link
            to="/accessories"
            className="list__link list__link--accessories"
          ></Link>

          <h3 className="list__title list__title-link">Mobile phones</h3>

          <span className="list__count">43 models</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductsList;
