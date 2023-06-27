import { Link } from 'react-router-dom';

type ShopCategoryProps = {
  imageUrl: string;
  name: string;
  count: number;
  to: string;
};

export const ShopCategory = ({
  imageUrl,
  name,
  count,
  to,
}: ShopCategoryProps) => (
  <Link to={`/${to}`} className="shop-categories__link shop-categories__link">
    <div className={`shop-categories__wrapper shop-categories__wrapper--${to}`}>
      <img
        className={`shop-categories__image shop-categories__image--${to}`}
        src={imageUrl}
        alt=""
      />
    </div>

    <p className="shop-categories__name">{name}</p>

    <p className="shop-categories__count">{`${count} models`}</p>
  </Link>
);
