import { Link } from 'react-router-dom';
import './ShopCategories.scss';

export const ShopCategories = () => (
  <div className="shop-categories">
    <h1 className="shop-categories__title">Shop by category</h1>
    <div className="shop-categories__container">
      <Link
        to="/phones"
        className="shop-categories__link shop-categories__link"
      >
        <div
          className="shop-categories__image shop-categories__image--phones"
        />
        <p className="shop-categories__name">Mobile phones</p>
        <p className="shop-categories__count">95 models</p>
      </Link>

      <Link
        to="/tablets"
        className="shop-categories__link shop-categories__link"
      >
        <div
          className="shop-categories__image shop-categories__image--tablets"
        />
        <p className="shop-categories__name">Tablets</p>
        <p className="shop-categories__count">95 models</p>
      </Link>

      <Link
        to="/accessories"
        className="shop-categories__link shop-categories__link"
      >
        <div
          className="shop-categories__image shop-categories__image--accessories"
        />
        <p className="shop-categories__name">Accessories</p>
        <p className="shop-categories__count">95 models</p>
      </Link>
    </div>
  </div>
);
