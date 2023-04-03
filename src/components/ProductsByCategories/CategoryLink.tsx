import { FC } from 'react';
import { Link } from 'react-router-dom';
import './CategoryLink.scss';

type Props = {
  url: string;
  imageUrl: string;
  title: string;
  amount: number;
};

export const CategoryLink: FC<Props> = ({
  url,
  imageUrl,
  title,
  amount,
}) => {
  return (
    <Link
      to={url}
      className="categories__link category"
    >
      <div className="category-image-container">
        <img
          src={imageUrl}
          alt={title}
          className="category__image"
        />
      </div>

      <p className="category__title">{title}</p>
      <p className="category__items-amount">{`${amount} models`}</p>
    </Link>
  );
};
