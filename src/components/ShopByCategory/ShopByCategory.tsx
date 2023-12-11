import { NavLink } from 'react-router-dom';
import './ShopByCategory.scss';

export const ShopByCategory = () => (
  <div className="shop-by-category">
    <div className="category-header">Shop by category</div>
    <div data-cy="categoryLinksContainer" className="categories">
      <NavLink to="/phones" className="category-item">
        <img
          className="category-image"
          src="_new/img/ShopByCategoryImgs/phones-2.png"
          alt="Mobile phones"
        />
        <div className="category-info">
          <div className="text-wrapper">Mobile phones</div>
          <div className="models-count">95 models</div>
        </div>
      </NavLink>
      <NavLink to="/tablets" className="category-item">
        <img
          className="category-image"
          src="_new/img/ShopByCategoryImgs/phones-1.png"
          alt="Tablets"
        />
        <div className="category-info">
          <div className="text-wrapper">Tablets</div>
          <div className="models-count">24 models</div>
        </div>
      </NavLink>
      <NavLink to="/accessories" className="category-item">
        <img
          className="category-image"
          src="_new/img/ShopByCategoryImgs/phones.png"
          alt="Accessories"
        />
        <div className="category-info">
          <div className="text-wrapper">Accessories</div>
          <div className="models-count">100 models</div>
        </div>
      </NavLink>
    </div>
  </div>
);
