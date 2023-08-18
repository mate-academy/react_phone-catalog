import { NavLink } from 'react-router-dom';
import { Product } from '../../types/Product';
import photoPhone from './category-phones.png';
import photoAccessories from './category-accessories.png';
import photoTablets from './category-tablets.png';

import './SortPhones.scss';

interface Props {
  phones: Product[];
  accessories: Product[];
  tablets: Product[];

}

export const SortPhones: React.FC<Props> = ({
  phones,
  accessories,
  tablets,
}) => {
  return (
    <div className="container">
      <h1 className="name__page hot-phones__title">Shop by category</h1>
      <div className="sortedProduct">
        <div className="sortedProduct__block">
          <NavLink to="/phones" className="sortedProduct__link">
            <div className="sortedProduct__photo">
              <img
                src={photoPhone}
                alt="sortedPhone"
                className="sortedProduct__img"
              />
            </div>
            <h3 className="sortedProduct__title">Mobile phones</h3>
            <p className="sortedProduct__count">
              {`${phones.length} ${phones.length <= 1 ? 'model' : 'models'}`}
            </p>
          </NavLink>
        </div>
        <div className="sortedProduct__block">
          <NavLink to="/tablets" className="sortedProduct__link">
            <div className="sortedProduct__photo">
              <img
                src={photoTablets}
                alt="sortedTablets"
                className="sortedProduct__img"
              />
            </div>
            <h3 className="sortedProduct__title">Tablets</h3>
            <p className="sortedProduct__count">
              {`${tablets.length} ${tablets.length <= 1 ? 'model' : 'models'}`}
            </p>
          </NavLink>
        </div>
        <div className="sortedProduct__block">
          <NavLink to="/accessories" className="sortedProduct__link">
            <div className="sortedProduct__photo">
              <img
                src={photoAccessories}
                alt="sortedAccessories"
                className="sortedProduct__img"
              />
            </div>
            <h3 className="sortedProduct__title">Accessories</h3>
            <p className="sortedProduct__count">
              {`${accessories.length} ${accessories.length <= 1 ? 'model' : 'models'}`}
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
