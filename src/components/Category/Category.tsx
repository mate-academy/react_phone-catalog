/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import './Category.scss';
import mobile from './categoryImage/mobile.png';
import tablet from './categoryImage/tablet.png';
import accessories from './categoryImage/accessories.png';

export const Category: React.FC = () => {
  return (
    <section className="category">
      <div className="category__title">Shop by category</div>

      <div className="category__list">
        <div className="category__item">
          <Link to="/" className="category__item-link">
            <img src={mobile} alt="category_img" className="category__item-img" />
          </Link>
          <div className="category__item-title">
            Mobile phones
          </div>
          <div className="category__item-amount">
            95 models
          </div>
        </div>

        <div className="category__item">
          <Link to="/" className="category__item-link">
            <img src={tablet} alt="category_img" className="category__item-img" />
          </Link>
          <div className="category__item-title">
            Mobile phones
          </div>
          <div className="category__item-amount">
            95 models
          </div>
        </div>

        <div className="category__item">
          <Link to="/" className="category__item-link">
            <img src={accessories} alt="category_img" className="category__item-img" />
          </Link>
          <div className="category__item-title">
            Mobile phones
          </div>
          <div className="category__item-amount">
            95 models
          </div>
        </div>

      </div>
    </section>

  );
};
