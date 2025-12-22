import { Link } from 'react-router-dom';
import phones from '../../../../public/api/phones.json';
import tablets from '../../../../public/api/tablets.json';
import accessories from '../../../../public/api/accessories.json';
import './HomePageCategories.scss';

export const HomePageCategories = () => {
  return (
    <div className="categories">
      <h2 className="categories__title">Shop by category</h2>

      <div className="categories__list">
        <Link to="/phones" className="category">
          <div className="category__image category__image--phones" />
          <div className="category__name">Mobile phones</div>
          <div className="category__count">{phones.length} models</div>
        </Link>

        <Link to="/tablets" className="category">
          <div className="category__image category__image--tablets" />
          <div className="category__name">Tablets</div>
          <div className="category__count">{tablets.length} models</div>
        </Link>

        <Link to="/accessories" className="category">
          <div className="category__image category__image--accessories" />
          <div className="category__name">Accessories</div>
          <div className="category__count">{accessories.length} models</div>
        </Link>
      </div>
    </div>
  );
};
