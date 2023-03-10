import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  srcImg: string;
  title: string;
  count: number;
};

export const Category: FC<Props> = ({
  to, srcImg, title, count,
}) => {
  return (
    <div className="category">
      <Link to={to} className="category__box-img">
        <img src={srcImg} alt={title} className="category__img" />
      </Link>

      <h3 className="category__title">{title}</h3>
      <p className="category__count">{`${count} models`}</p>
    </div>
  );
};
