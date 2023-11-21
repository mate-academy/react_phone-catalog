import { FC } from 'react';
import { Link } from 'react-router-dom';
import './shop-by-category.scss';

type Props = {
  to: string;
  srcImg: string;
  title: string;
  count: number;
};

export const ShopByCategory: FC<Props> = ({
  to, srcImg, title, count,
}) => {
  return (
    <div className="shop-by-category " data-cy="categoryLinksContainer">
      <Link to={to} className="shop-by-category__box-img">
        <img src={srcImg} alt={title} className="shop-by-category__img" />
      </Link>

      <Link to={to} className="shop-by-category__title">
        {title}
      </Link>

      <p className="shop-by-category__count">{`${count} models`}</p>
    </div>
  );
};
