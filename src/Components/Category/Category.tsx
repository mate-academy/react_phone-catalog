import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Category.scss';
import { useContext } from 'react';
import { ProductContext } from '../../helper/ProductContext';

export const Category = () => {
  const { phones, tablets, accessories } = useContext(ProductContext);

  return (
    <div className="category">
      <h1 className="category__title">Shop by category</h1>

      <div className="category__list">
        <div className="category__phones category__item">
          <div className="category__image-box category__image-box--phones">
            <img
              className="category__img category__img--phones"
              src="_new/img/category-phones.png"
            />
          </div>

          <NavLink
            to="/phones"
            className={({ isActive }) =>
              classNames('category__link', { 'is-active': isActive })
            }
          >
            Mobile Phones
          </NavLink>
          <p className="category__descr">{`${phones.length} models`}</p>
        </div>

        <div className="category__tablets category__item">
          <div className="category__image-box category__image-box--tablets">
            <img
              className="category__img category__img--tablets"
              src="_new\img\category-tablets.png"
            />
          </div>

          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              classNames('category__link', { 'is-active': isActive })
            }
          >
            Tablets
          </NavLink>
          <p className="category__descr">{`${tablets.length} models`}</p>
        </div>

        <div className="category__acccessories category__item">
          <div
            className="category__image-box 
            category__image-box--acccessories"
          >
            <img
              className="category__img category__img--acccessories "
              src="_new\img\category-accessories.png"
            />
          </div>

          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              classNames('category__link', { 'is-active': isActive })
            }
          >
            Accessories
          </NavLink>
          <p className="category__descr">{`${accessories.length} models`}</p>
        </div>
      </div>
    </div>
  );
};
