import { Link } from 'react-router-dom';

import { Product, ProductType } from '../../types/Product';

import './Categories.scss';
import phoneBaner from '../../Images/Categories/phoneBaner.png';
import tabletsBaner from '../../Images/Categories/tabletBaner.png';
import accessoriesBaner from '../../Images/Categories/accessoryBanner.png';

type Props = {
  products: Product[];
};

export const getLengthByCategory = (arr: Product[], category: string) => {
  return arr.filter((pr) => pr.category === category).length;
};

export const Categories: React.FC<Props> = ({ products }) => {
  return (
    <div className="category">
      <h1 className="category__title">Shop by category</h1>

      <div className="category__container">
        <Link to="/phones" className="category__phone">
          <div className="category__bg category__bg--phone">
            <img className="category__img" src={phoneBaner} alt="phone" />
          </div>
          <h3 className="category__name">Mobile phones</h3>
          <div className="category__count">
            {getLengthByCategory(products, ProductType.Phone)}
            {' '}
            models
          </div>
        </Link>

        <Link to="/tablets" className="category__tablets">
          <div className="category__bg category__bg--tablets">
            <img className="category__img" src={tabletsBaner} alt="tablets" />
          </div>
          <h3 className="category__name">Tablets</h3>
          <div className="category__count">
            {getLengthByCategory(products, ProductType.Tablet)}
            {' '}
            models
          </div>
        </Link>

        <Link to="/accessories" className="category__accessories">
          <div className="category__bg category__bg--accessories">
            <img
              className="category__img"
              src={accessoriesBaner}
              alt="accessories"
            />
          </div>
          <h3 className="category__name">Accessories</h3>
          <div className="category__count">
            {getLengthByCategory(products, ProductType.Accessories)}
            {' '}
            models
          </div>
        </Link>
      </div>
    </div>
  );
};
