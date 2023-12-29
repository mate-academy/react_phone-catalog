/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import './Category.scss';
import mobile from './categoryImage/mobile.png';
import tablet from './categoryImage/tablet.png';
import accessories from './categoryImage/accessories.png';
import { Product } from '../../types/Products';

interface Props {
  products: Product[]
}

export const Category: React.FC<Props> = ({ products }) => {
  const getCategoryAmount = (type: string) => {
    return products.filter(item => item.category === type).length;
  };

  return (
    <section className="category">
      <div className="category__title">Shop by category</div>

      <div className="category__list">
        <div className="category__item">
          <Link to="/phones" className="category__item-link">
            <img src={mobile} alt="category_img" className="category__item-img" />
          </Link>
          <div className="category__item-title">
            Mobile phones
          </div>
          <div className="category__item-amount">
            {`${getCategoryAmount('phones')} models`}
          </div>
        </div>

        <div className="category__item">
          <Link to="/tablets" className="category__item-link">
            <img src={tablet} alt="category_img" className="category__item-img" />
          </Link>
          <div className="category__item-title">
            Tablets
          </div>
          <div className="category__item-amount">
            {`${getCategoryAmount('tablets')} models`}
          </div>
        </div>

        <div className="category__item">
          <Link to="/accessory" className="category__item-link">
            <img src={accessories} alt="category_img" className="category__item-img" />
          </Link>
          <div className="category__item-title">
            Accessories
          </div>
          <div className="category__item-amount">
            {`${getCategoryAmount('accessories')} models`}
          </div>
        </div>

      </div>
    </section>

  );
};
