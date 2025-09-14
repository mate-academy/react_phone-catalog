import { NavLink } from 'react-router-dom';
import { useProductHook } from '../ProductPage/useProductHook';
import './Category.module.scss';
import { categories } from './categoryList';

export const Category = () => {
  const { phones } = useProductHook();

  return (
    <div className="card">
      {categories.map((category, index) => (
        <div className="card__category" key={index}>
          <NavLink to={category.link} className="card__link">
            <img
              src={category.image}
              alt={category.title}
              className="card__image"
            />
            <h3 className="card__title">{category.title}</h3>
            <h3 className="card__description">{phones.length}</h3>
          </NavLink>
        </div>
      ))}
    </div>
  );
};
