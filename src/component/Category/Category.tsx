import { NavLink } from 'react-router-dom';
import './Category.scss';

export const Category = () => {
  return (
    <section className="category" data-cy="categoryLinksContainer">
      <div className="container">
        <h2 className="category__title"> Shop by category </h2>

        <div className="category__wrap">
          <NavLink
            to="/phones"
            className="category__item"
          >
            <img
              src="./_new/img/category-phones.jpg"
              alt="Phones"
              className="category__item__img"
            />

            <h3 className="category__item__title"> Mobile phones </h3>

            <p className="category__item__subtitle"> 95 models </p>
          </NavLink>

          <NavLink
            to="/tablets"
            className="category__item"
          >
            <img
              src="./_new/img/category-tablets.jpg"
              alt="Tablets"
              className="category__item__img"
            />

            <h3 className="category__item__title"> Tablets </h3>

            <p className="category__item__subtitle"> 24 models </p>
          </NavLink>

          <NavLink
            to="/accessories"
            className="category__item"
          >
            <img
              src="./_new/img/category-accessories.jpg"
              alt="Accessories"
              className="category__item__img"
            />

            <h3 className="category__item__title"> Accessories </h3>

            <p className="category__item__subtitle"> 100 models </p>
          </NavLink>
        </div>
      </div>
    </section>
  );
};
