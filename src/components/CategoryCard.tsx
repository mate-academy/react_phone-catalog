import { FC } from 'react';
import { Link } from 'react-router-dom';
import { lower } from 'src/utils/shortHands';
import { Category } from '../types/Category';

type Props = {
  category: Category,
};

type FromNameToLink = {
  [key: string]: string,
};

const fromNameToLink: FromNameToLink = {
  mobile: 'phones',
  tablets: 'tablets',
  accessories: 'accessories',
};

export const CategoryCard: FC<Props> = ({ category }) => {
  const {
    name,
    backgrondColor,
    imageUrl,
    itemsLeft,
  } = category;
  const firstLinkName = name.split(' ')[0];

  return (
    <div className="shop-by-category__card">
      <Link
        to={`/${fromNameToLink[lower(firstLinkName)]}`}
        className="shop-by-category__background"
        style={{ background: backgrondColor }}
      >
        <img
          className="shop-by-category__background__image"
          src={`assets/categories/${imageUrl}`}
          alt=""
        />
        <div className="shop-by-category__overlay icon" />
      </Link>

      <div className="shop-by-category__desc">
        <h3>{name}</h3>
      </div>

      <div className="shop-by-category__models-quantity">
        {itemsLeft === 0
          ? 'No items left'
          : `${itemsLeft} left`}
      </div>
    </div>
  );
};
