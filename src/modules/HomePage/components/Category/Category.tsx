import { NavLink } from 'react-router-dom';

export const Category = () => {
  return (
    <div className="shop-by-category">
      <h2 className="text-h2">Shop by category</h2>
      <div className="shop-by-category__content">
        <NavLink to={'/phones'} className="shop-by-category__link--phones">
          <div className="bg-category bg-category--phones">
            <img
              src={`${import.meta.env.BASE_URL}img/category-phones.webp`}
              className="categoty-photo"
              alt="mobile phones categoty"
            />
          </div>
          <p className="text-h4 shop-by-category__title">Mobile phones</p>
          <p className="text-body secondary shop-by-category__quentity">
            95 models
          </p>
        </NavLink>

        <NavLink to={'/tablets'} className="shop-by-category__link--tablets">
          <div className="bg-category bg-category--tablets">
            <img
              src={`${import.meta.env.BASE_URL}img/category-tablets.webp`}
              className="categoty-photo"
              alt="tablets categoty"
            />
          </div>
          <p className="text-h4 shop-by-category__title">Tablets</p>
          <p className="text-body secondary shop-by-category__quentity">
            24 models
          </p>
        </NavLink>

        <NavLink
          to={'/accessories'}
          className="shop-by-category__link--accessories"
        >
          <div className="bg-category bg-category--accessories">
            <img
              src={`${import.meta.env.BASE_URL}img/category-accessories.webp`}
              className="categoty-photo"
              alt="accessories categoty"
            />
          </div>
          <p className="text-h4 shop-by-category__title">Accessories</p>
          <p className="text-body secondary shop-by-category__quentity">
            100 models
          </p>
        </NavLink>
      </div>
    </div>
  );
};
