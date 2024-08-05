import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Category.scss';
import { useContext } from 'react';
import { ProductContext } from '../../helper/ProductContext';

export const Category = () => {
  const { product } = useContext(ProductContext);
  const phones = product.filter(prod => prod.category === 'phones').length;
  const tablets = product.filter(prod => prod.category === 'tablets').length;
  const accessories = product.filter(
    prod => prod.category === 'accessories',
  ).length;

  return (
    <div className="category">
      <h1 className="category__title">Shop by category</h1>

      <div className="category__list">
        <div className="category__phones category__item">
          <div className="category__image-box category__image-box--phones">
            <img
              className="category__img category__img--phones"
              src="img/category-phones.png"
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
          <p className="category__descr">{`${phones} models`}</p>
        </div>

        <div className="category__tablets category__item">
          <div className="category__image-box category__image-box--tablets">
            <img
              className="category__img category__img--tablets"
              src="img\category-tablets.png"
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
          <p className="category__descr">{`${tablets} models`}</p>
        </div>

        <div className="category__acccessories category__item">
          <div
            className="category__image-box 
            category__image-box--acccessories"
          >
            <img
              className="category__img category__img--acccessories "
              src="img\category-accessories.png"
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
          <p className="category__descr">{`${accessories} models`}</p>
        </div>
      </div>
    </div>
  );
};
