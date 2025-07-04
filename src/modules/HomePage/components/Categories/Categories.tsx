import './Categories.scss';
import PhonesCategory from './../../../../img/category-phones.png';
import TabletsCategory from './../../../../img/category-tablets.png';
import AccessoriesCategory from './../../../../img/category-accessories.png';
import { NavLink } from 'react-router-dom';

export const Categories = () => {
  return (
    <section className="categories">
      <h2 className="section-title">Shop by category</h2>
      <div className="categories__row">
        <NavLink to="/phones" className="categories__link">
          <div className="categories__col">
            <div className="categories__img">
              <img src={PhonesCategory} alt="category-img" />
            </div>
            <div className="categories__title">Mobile phones</div>
            <div className="categories__subtitle">95 models</div>
          </div>
        </NavLink>
        <NavLink to="/tablets" className="categories__link">
          <div className="categories__col">
            <div className="categories__img">
              <img src={TabletsCategory} alt="category-img" />
            </div>
            <div className="categories__title">Tablets</div>
            <div className="categories__subtitle">24 models</div>
          </div>
        </NavLink>
        <NavLink to="/accessories" className="categories__link">
          <div className="categories__col">
            <div className="categories__img">
              <img src={AccessoriesCategory} alt="category-img" />
            </div>
            <div className="categories__title">Accessories</div>
            <div className="categories__subtitle">100 models</div>
          </div>
        </NavLink>
      </div>
    </section>
  );
};
