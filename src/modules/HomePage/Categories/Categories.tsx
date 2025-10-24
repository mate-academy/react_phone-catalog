import { NavLink } from 'react-router-dom';
import style from './Categories.module.scss';

export const Category = () => {
  return (
    <div className={style.categories}>
      <div className={style.categories__top}>
        <h4 className={style.categories__top__title}>Shop by category</h4>
      </div>
      <div className={style.categories__list}>
        <div className={style.categories__list__category}>
          <NavLink className={style[`categories__list__category--link`]} to="/phones">
            <img
              className={`${style[`categories__list__category--image`]}
              ${style[`categories__list__category--phones`]}
              `}
              src="./img/category-phones.webp"
            />
          </NavLink>
          <p className={style.categories__list__category__name}>Mobile phones</p>
          <p className={style.categories__list__category__quantity}>95 models</p>
        </div>
        <div className={style.categories__list__category}>
          <NavLink className={style[`categories__list__category--link`]} to="/tablets">
            <img
              className={`${style[`categories__list__category--image`]}
              ${style[`categories__list__category--tablets`]}
              `}
              src="./img/category-tablets.png"
            />
          </NavLink>
          <p className={style.categories__list__category__name}>Tablets</p>
          <p className={style.categories__list__category__quantity}>24 models</p>
        </div>
        <div className={style.categories__list__category}>
          <NavLink
            className={style[`categories__list__category--link`]}
            to="/accessories"
          >
            <img
              className={`${style[`categories__list__category--image`]}
              ${style[`categories__list__category--accessories`]}
              `}
              src="./img/category-accessories.png"
            />
          </NavLink>
          <p className={style.categories__list__category__name}>Accessories</p>
          <p className={style.categories__list__category__quantity}>100 models</p>
        </div>
      </div>
    </div>
  );
};
