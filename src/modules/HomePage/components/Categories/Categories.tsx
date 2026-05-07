import { Link } from 'react-router-dom';
import s from './Categories.module.scss';

export const Categories = () => {
  return (
    <div className={s.categories}>
      <h2 className={s.categories__title}>Shop by category</h2>

      <div className={s.categories__content}>
        <div className={s.categories__item}>
          <Link
            to="/phones"
            className={s.categories__link}
            style={{ backgroundColor: '#6D6474' }}
          >
            <img
              className={s.categories__img}
              src="./img/category-phone.png"
              alt="category-phone.png"
            />
          </Link>
          <Link to="/phones" className={s.categories__name}>
            Mobile phones
          </Link>
          <div className={s.categories__amount}>95 models</div>
        </div>

        <div className={s.categories__item}>
          <Link
            to="/tablets"
            className={s.categories__link}
            style={{ backgroundColor: '#8D8D92' }}
          >
            <img
              className={s.categories__img}
              src="./img/category-tablet.png"
              alt=""
            />
          </Link>
          <Link to="/tablets" className={s.categories__name}>
            Tablets
          </Link>
          <div className={s.categories__amount}>24 models</div>
        </div>

        <div className={s.categories__item}>
          <Link
            to="/accessories"
            className={s.categories__link}
            style={{ backgroundColor: '#973D5F' }}
          >
            <img
              className={s.categories__img}
              src="./img/category-accessory.png"
              alt=""
            />
          </Link>
          <Link to="/accessories" className={s.categories__name}>
            Accessories
          </Link>
          <div className={s.categories__amount}>100 models</div>
        </div>
      </div>
    </div>
  );
};
