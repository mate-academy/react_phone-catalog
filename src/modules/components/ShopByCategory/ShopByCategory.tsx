import { assetUrl } from '../../../utils/url';
import { Link } from 'react-router-dom';
import './ShopByCategory.scss';

interface Props {
  counts: {
    phones: number;
    tablets: number;
    accessories: number;
  };
}

export const ShopByCategory = ({ counts }: Props) => {
  return (
    <section className="shop-by-category">
      <h2 className="shop-by-category__title">Shop by category</h2>

      <div className="shop-by-category__grid">
        <Link to="/phones" className="shop-by-category__item">
          <img
            className="shop-by-category__image"
            src={assetUrl('/img/category-phones.webp')}
            alt="Mobile phones"
          />
          <h4 className="shop-by-category__name">Mobile phones</h4>
          <p className="shop-by-category__count">{counts.phones} models</p>
        </Link>

        <Link to="/tablets" className="shop-by-category__item">
          <img
            className="shop-by-category__image"
            src={assetUrl('/img/category-tablets.webp')}
            alt="Tablets"
          />
          <h4 className="shop-by-category__name">Tablets</h4>
          <p className="shop-by-category__count">{counts.tablets} models</p>
        </Link>

        <Link to="/accessories" className="shop-by-category__item">
          <img
            className="shop-by-category__image"
            src={assetUrl('/img/category-accessories.webp')}
            alt="Accessories"
          />
          <h4 className="shop-by-category__name">Accessories</h4>
          <p className="shop-by-category__count">{counts.accessories} models</p>
        </Link>
      </div>
    </section>
  );
};
