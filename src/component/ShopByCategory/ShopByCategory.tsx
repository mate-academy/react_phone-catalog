import acessorios from '../../../public/img/category-accessories.webp';
import celular from '../../../public/img/category-phones.webp';
import tablets from '../../../public/img/category-tablets.webp';
import { Link } from 'react-router-dom';
import './ShopByCategory.scss';

export const ShopByCategory = () => {
  return (
    <>
      <h3>Shop by Category</h3>

      <div className="allCategory">
        <Link to="/phones" className="link">
          <div className="div-category">
            <img src={celular} />
          </div>
        </Link>

        <Link to="/tablets" className="link">
          <div className="div-category">
            <img src={tablets} />
          </div>
        </Link>

        <Link to="/accessories" className="link">
          <div className="div-category">
            <img src={acessorios} />
          </div>
        </Link>
      </div>
    </>
  );
};
