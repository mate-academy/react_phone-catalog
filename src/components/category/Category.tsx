import React from 'react';
import { Link } from 'react-router-dom';

import './Category.scss';

import Accessories from './assets/category-accessories.png';
import Tablets from './assets/category-tablets.png';
import Phones from './assets/category-phones.png';

type Props = {
  tablets: number;
  accessories: number;
  phones: number;
};

const Category: React.FC<Props> = ({
  phones,
  tablets,
  accessories,
}) => {
  return (
    <div className="categories">
      <h1 className="categories-title">
        Shop by category
      </h1>

      <div className="categories-container">
        <Link
          to="/phones"
          data-cy="categoryLinksContainer"
        >
          <div className="category">
            <img
              className="category-image"
              src={Phones}
              alt="phones category"
            />
            <div className="category-title-container">
              <h2 className="category-title">Mobile phones</h2>
              <h3 className="category-subtitle">{`${phones} models`}</h3>
            </div>
          </div>
        </Link>

        <Link
          to="/tablets"
          data-cy="categoryLinksContainer"
        >
          <div className="category">
            <img
              className="category-image"
              src={Tablets}
              alt="tablets category"
            />
            <div className="category-title-container">
              <h2 className="category-title">Tablets</h2>
              <h3 className="category-subtitle">{`${tablets} models`}</h3>
            </div>
          </div>
        </Link>

        <Link
          to="/accessories"
          data-cy="categoryLinksContainer"
        >
          <div className="category">
            <img
              className="category-image"
              src={Accessories}
              alt="accessories category"
            />
            <div className="category-title-container">
              <h2 className="category-title">Accessories</h2>
              <h3 className="category-subtitle">{`${accessories} models`}</h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Category;
