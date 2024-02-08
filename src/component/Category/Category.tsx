import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../ProductContext';

export const Category = () => {
  const { products, tablets, accessories } = useContext(ProductContext);

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
              src="./img/category-phones.jpg"
              alt="Phones"
              className="category__item__img"
            />

            <h3 className="category__item__title"> Mobile phones </h3>

            <p className="category__item__subtitle">
              {`${products.length} models`}
            </p>
          </NavLink>

          <NavLink
            to="/tablets"
            className="category__item"
          >
            <img
              src="./img/category-tablets.jpg"
              alt="Tablets"
              className="category__item__img"
            />

            <h3 className="category__item__title"> Tablets </h3>

            <p className="category__item__subtitle">
              {`${tablets.length} models`}
            </p>
          </NavLink>

          <NavLink
            to="/accessories"
            className="category__item"
          >
            <img
              src="./img/category-accessories.jpg"
              alt="Accessories"
              className="category__item__img"
            />

            <h3 className="category__item__title"> Accessories </h3>

            <p className="category__item__subtitle">
              {`${accessories.length} models`}
            </p>
          </NavLink>
        </div>
      </div>
    </section>
  );
};
