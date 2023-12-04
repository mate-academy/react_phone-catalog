import { NavLink } from 'react-router-dom';

export const Category: React.FC = () => {
  return (
    <div className="category">
      <h1 className="category__title">Shop by category</h1>
      <ul className="category__list">
        <li className="category__item">
          <NavLink className="category__link category__phones" to="/phones">
            <img
              className="category__image category__image--phones"
              src="img/category-phones.png"
              alt="Mobile phones"
            />
          </NavLink>
          <h2 className="category__subtitle">Mobile phones</h2>
          <p className="category__paragraph">95 modesl</p>
        </li>
        <li className="category__item">
          <NavLink className="category__link category__tablets" to="/tablets">
            <img
              className="category__image"
              src="img/category-tablets.png"
              alt="Tablets"
            />
          </NavLink>
          <h2 className="category__subtitle">Tablets</h2>
          <p className="category__paragraph">24 modesl</p>
        </li>
        <li className="category__item">
          <NavLink
            className="category__link category__accessories"
            to="/accessories"
          >
            <img
              className="category__image"
              src="img/category-accessories.png"
              alt="Accessories"
            />
          </NavLink>
          <h2 className="category__subtitle">Accessories</h2>
          <p className="category__paragraph">100 modesl</p>
        </li>
      </ul>
    </div>
  );
};
