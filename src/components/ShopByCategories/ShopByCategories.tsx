import { NavLink } from 'react-router-dom';
import s from './ShopByCategories.module.scss';
import { useProductContext } from '../../context/ShopContext/ProductContext';

export const ShopByCategories = () => {
  const { phones, tablets, accessories } = useProductContext();
  const categories = ['phones', 'tablets', 'accessories'];

  const getData = (category: string) => {
    switch (category) {
      case 'phones':
        return phones;
      case 'tablets':
        return tablets;
      default:
        return accessories;
    }
  };

  return (
    <div className={s['shop-by-categories']}>
      <h2 className={s['shop-by-categories__title']}>Shop by category</h2>

      <div className={s['shop-by-categories__container']}>
        {categories.map((category, index) => {
          const data = getData(category);

          return (
            <div key={index} className={s['shop-by-categories__item']}>
              <NavLink
                to="/phones"
                className={`${s['shop-by-categories__link']} ${s[`shop-by-categories__link--${category}`]}`}
              >
                <img
                  src={`img/category-${category}.webp`}
                  alt=""
                  className={s['shop-by-categories__img']}
                />
              </NavLink>

              <div className={s['shop-by-categories__info']}>
                <NavLink
                  to={`/${category}`}
                  className={s['shop-by-categories__subtitle']}
                >
                  {category}
                </NavLink>
                <p className={s['shop-by-categories__counter']}>
                  {data?.length} models
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
