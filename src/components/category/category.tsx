/* eslint-disable max-len */
import './category.scss';
import categoryPhones from '../../images/homepage/category-phones.png';
import categoryTablets from '../../images/homepage/category-tablets.png';
import categoryAccessories from '../../images/homepage/category-accessories.png';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { NavLink } from 'react-router-dom';

export const Category = () => {
  return (
    <div className="category">
      <div className="category__box">
        <NavLink to="/phones" className="category__phones category__boxColor">
          <img
            src={categoryPhones}
            alt="categoryPhones"
            className="category__photo"
          />
        </NavLink>
        <NavLink to="/phones" className="h3 category__subtitle">
          Mobile phones
        </NavLink>
        <p className="bodyText category__bodyText">{phones.length} models</p>
      </div>
      <div className="category__box">
        <NavLink to="/tablets" className="category__tablets category__boxColor">
          <img
            src={categoryTablets}
            alt="categoryTablets"
            className="category__photo"
          />
        </NavLink>
        <NavLink to="/tablets" className="h3 category__subtitle">
          Tablets
        </NavLink>
        <p className="bodyText category__bodyText">{tablets.length} models</p>
      </div>
      <div className="category__box">
        <NavLink
          to="/accessories"
          className="category__accessories category__boxColor"
        >
          <img
            src={categoryAccessories}
            alt="categoryAccessories"
            className="category__photo"
          />
        </NavLink>
        <NavLink to="/accessories" className="h3 category__subtitle">
          Accessories
        </NavLink>
        <p className="bodyText category__bodyText">
          {accessories.length} models
        </p>
      </div>
    </div>
  );
};
