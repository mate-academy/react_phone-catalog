import { Link } from 'react-router-dom';
import './Category.scss';
import { phones, tablets, accessories } from '../../../../constants/common';

export const Category = () => {
  return (
    <div className="category">
      <h2 className="section-title">Shop by category</h2>
      <ul className="category__list">
        <li className="category__item">
          <Link to="/phones" className="category__link">
            <div className="category__image">
              <img
                src="./img/category/category-phones.png"
                alt="Mobile phones"
              />
            </div>
            <h4 className="category__name">Mobile phones</h4>
            <p className="category__count">{phones.length} models</p>
          </Link>
        </li>
        <li className="category__item">
          <Link to="/tablets" className="category__link">
            <div className="category__image">
              <img src="./img/category/category-tablets.png" alt="Tablets" />
            </div>
            <h4 className="category__name">Tablets</h4>
            <p className="category__count">{tablets.length} models</p>
          </Link>
        </li>
        <li className="category__item">
          <Link to="/accessories" className="category__link">
            <div className="category__image">
              <img
                src="./img/category/category-accessories.png"
                alt="Accessories"
              />
            </div>
            <h4 className="category__name">Accessories</h4>
            <p className="category__count">{accessories.length} models</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};
