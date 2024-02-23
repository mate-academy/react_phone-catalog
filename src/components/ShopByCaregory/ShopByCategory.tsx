import { NavLink } from 'react-router-dom';
import './ShopByCategory.scss';
import { scrollToTop } from '../../utils/functions';

export const ShopByCategory = () => (
  <div className="shop-by-category">
    <h1 className="shop-by-category__title">
      Shop by category
    </h1>

    <div
      className="shop-by-category__content"
      data-cy="categoryLinksContainer"
    >
      <NavLink
        to="/phones"
        className="shop-by-category__link"
        onClick={scrollToTop}
      >
        <div
          className="
            shop-by-category__link__image
            shop-by-category__link__image-phones"
        />
        <div className="shop-by-category__link-title">Mobile phones</div>
        <div className="shop-by-category__link-description">95 models</div>

      </NavLink>

      <NavLink
        to="/"
        className="shop-by-category__link"
        onClick={scrollToTop}
      >
        <div
          className="
            shop-by-category__link__image
            shop-by-category__link__image-tablets"
        />
        <div className="shop-by-category__link-title">Tablets</div>
        <div className="shop-by-category__link-description">24 models</div>
      </NavLink>

      <NavLink
        to="/"
        className="shop-by-category__link"
        onClick={scrollToTop}
      >
        <div
          className="shop-by-category__link__image
               shop-by-category__link__image-accessories"
        />
        <div className="shop-by-category__link-title">
          Accessories
        </div>
        <div className="shop-by-category__link-description">
          15 models
        </div>

      </NavLink>
    </div>

  </div>
);
