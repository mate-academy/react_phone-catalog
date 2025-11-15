import { NavLink } from 'react-router-dom';
import style from './Categories.module.scss';

export const Category = () => {
  return (
    <div className={style.categories}>
      <div className={style.categories__top}>
        <h2 className={style.categories__top__title}>Shop by category</h2>
      </div>
      <div className={style.categories__list}>
        <NavLink
          to="/phones"
          className={style.categories__list__category}
        >
          <div className={style['categories__list__category--image']}>
            <img
              className={style['categories__list__category--phones']}
              src="./img/category-phones.webp"
              alt="Mobile phones"
            />
          </div>
          <h3 className={style.categories__list__category__name}>Mobile phones</h3>
          <p className={style.categories__list__category__quantity}>95 models</p>
        </NavLink>

        <NavLink
          to="/tablets"
          className={style.categories__list__category}
        >
          <div className={style['categories__list__category--image']}>
            <img
              className={style['categories__list__category--tablets']}
              src="./img/category-tablets.png"
              alt="Tablets"
            />
          </div>
          <h3 className={style.categories__list__category__name}>Tablets</h3>
          <p className={style.categories__list__category__quantity}>24 models</p>
        </NavLink>

        <NavLink
          to="/accessories"
          className={style.categories__list__category}
        >
          <div className={style['categories__list__category--image']}>
            <img
              className={style['categories__list__category--accessories']}
              src="./img/category-accessories.png"
              alt="Accessories"
            />
          </div>
          <h3 className={style.categories__list__category__name}>Accessories</h3>
          <p className={style.categories__list__category__quantity}>100 models</p>
        </NavLink>
      </div>
    </div>
  );
};
