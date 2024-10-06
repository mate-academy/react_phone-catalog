import { NavLink } from 'react-router-dom';
import './Categories.module.scss';

export const Categories = () => {
  return (
    <>
      <h1 className="article__title categories__title">Shop by category</h1>
      <article className="categories">
        <div className="phones__category category">
          <NavLink
            to="/phones"
            className="category__image phones__category-image"
          ></NavLink>
          <div className="category__wrapper">
            <h2 className="category__title">Mobile phones</h2>
            <p className="category__counter">124 models</p>
          </div>
        </div>

        <div className="tablets__category category">
          <NavLink
            to="/tablets"
            className="category__image tablets__category-image"
          ></NavLink>
          <div className="category__wrapper">
            <h2 className="category__title">Tablets</h2>
            <p className="category__counter">36 models</p>
          </div>
        </div>
        <div className="accessories__category category">
          <NavLink
            to="/accessories"
            className="category__image accessories__category-image"
          ></NavLink>
          <div className="category__wrapper">
            <h2 className="category__title">Accessories</h2>
            <p className="category__counter">34 models</p>
          </div>
        </div>
      </article>
    </>
  );
};
