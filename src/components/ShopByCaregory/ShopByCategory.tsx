import { NavLink } from 'react-router-dom';
import './ShopByCategory.scss';
import { scrollToTop } from '../../utils/functions';

interface Props {
  phonesCount: number,
  tabletsCount: number,
  accessoriesCount: number,
}

export const ShopByCategory: React.FC<Props> = ({
  phonesCount,
  tabletsCount,
  accessoriesCount,
}) => {
  return (
    <div className="shop-by-category">
      <h1 className="shop-by-category__title">
        Shop by category
      </h1>

      <div
        className="shop-by-category__content"
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
          <div className="shop-by-category__link-description">
            {`${phonesCount} models${phonesCount > 1 ? 's' : ''}`}
          </div>

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
          <div className="shop-by-category__link-description">
            {`${tabletsCount} models${tabletsCount > 1 ? 's' : ''}`}
          </div>
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
            {`${accessoriesCount} models${accessoriesCount > 1 ? 's' : ''}`}
          </div>

        </NavLink>
      </div>

    </div>
  );
};
