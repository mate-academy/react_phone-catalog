import './Categories.scss';
import { NavLink } from 'react-router-dom';

export const Categories = () => {
  return (
    <div className="categories categories--margin-top">
      <div className="categories__container">
        <h2 className="page__subtitle">Shop by category</h2>
        <ul className="categories__list">
          <li className="categories__item">
            <NavLink to="/phones" className="categories__link">
              <div
                className="categories__image-container
                  categories__image-container--phones"
              >
                <img
                  src="/img/category-phones.webp"
                  alt="Mobile Phones"
                  className="categories__image categories__image--phones"
                />
              </div>
              <p className="categories__name">Mobile phones</p>
              <p className="categories__quantity">95 models</p>
            </NavLink>
          </li>
          <li className="categories__item">
            <NavLink to="/tablets" className="categories__link">
              <div
                className="categories__image-container
                  categories__image-container--tablets"
              >
                <img
                  src="/img/category-tablets.png"
                  alt="Mobile Phones"
                  className="categories__image categories__image--tablets"
                />
              </div>
              <p className="categories__name">Tablets</p>
              <p className="categories__quantity">95 models</p>
            </NavLink>
          </li>
          <li className="categories__item">
            <NavLink to="/accessories" className="categories__link">
              <div
                className="categories__image-container
                  categories__image-container--accessories"
              >
                <img
                  src="/img/category-accessories.webp"
                  alt="Mobile Phones"
                  className="categories__image categories__image--accessories"
                />
              </div>
              <p className="categories__name">Accessories</p>
              <p className="categories__quantity">95 models</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
