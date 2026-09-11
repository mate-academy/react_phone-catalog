import { NavLink } from 'react-router-dom';
import style from './Categories.module.scss';

export const Categories = () => {
  return (
    <>
      <h2 className={style.categoriesTitle}>Shop by category</h2>;
      <div className={style.categoriesLinks}>
        <NavLink className={style.categoriesLink} to="/phones">
          <div className={style.categoriesCard}>
            <img
              className={style.categoriesimg}
              src={`${import.meta.env.BASE_URL}/img/category-phones.png`}
              alt="Category Phone"
            />
            <p className={style.categoriesText}>Mobile phones</p>
            <p className={style.categoriesModels}>95 models</p>
          </div>
        </NavLink>
        <NavLink className={style.categoriesLink} to="/tablets">
          <div className={style.categoriesCard}>
            <img
              className={style.categoriesimg}
              src={`${import.meta.env.BASE_URL}/img/category-tablets.png`}
              alt="Category Tablets"
            />
            <p className={style.categoriesText}>Tablets</p>
            <p className={style.categoriesModels}>24 models</p>
          </div>
        </NavLink>
        <NavLink className={style.categoriesLink} to="/accessories">
          <div className={style.categoriesCard}>
            <img
              className={style.categoriesimg}
              src={`${import.meta.env.BASE_URL}/img/category-accessories.png`}
              alt="Category Accessories"
            />
            <p className={style.categoriesText}>Accessories</p>
            <p className={style.categoriesModels}>100 models</p>
          </div>
        </NavLink>
      </div>
    </>
  );
};
