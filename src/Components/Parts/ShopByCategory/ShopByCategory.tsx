import { FC } from 'react';
import { Link } from 'react-router-dom';
import './ShopByCategory.scss';

type Props = {
  title: string;
  to: string;
  srcImg: string;
  count: number;
  background: string;
};

export const ShopByCategory: FC<Props> = ({
  title,
  to,
  srcImg,
  count,
  background,
}) => (
  <div className="shop-by-category">
    <Link
      to={to}
      className="shop-by-category__box-img"
      style={{
        backgroundColor: background,
      }}
    >
      <img src={srcImg} alt={title} className="shop-by-category__img" />
    </Link>

    <Link to={to} className="shop-by-category__title">
      {title}
    </Link>

    <p className="shop-by-category__count"> {`${count} models`} </p>
  </div>
);
