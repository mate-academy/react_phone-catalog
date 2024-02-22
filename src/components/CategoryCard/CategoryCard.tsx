import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateStore } from '../../store/StoreContext';
import { IMAGES } from '../../images/images';
import './CategoryCard.scss';

type Props = {
  category: string;
};

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const { products } = useContext(StateStore);

  let imgUrl = '';

  if (category === 'phones') {
    imgUrl = IMAGES['category-phones'];
  } else if (category === 'tablets') {
    imgUrl = IMAGES['category-tablets'];
  } else {
    imgUrl = IMAGES['category-accessories'];
  }

  const modelsLength = [...products]
    .filter(item => item.category === category).length;

  return (
    <Link to={`/${category}`} className="categoryCard">
      <img
        className="categoryCard__image"
        src={imgUrl}
        alt={`${category} category`}
      />
      <h3 className="categoryCard__title">
        {
          category === 'phones'
            ? `mobile ${category}`
            : category
        }
      </h3>
      <p className="smallText categoryCard__models">
        {`${modelsLength} models`}
      </p>
    </Link>
  );
};
