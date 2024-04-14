import React, { useContext } from 'react';
import './CategoryCard.scss';
import { Link } from 'react-router-dom';
import { ProductState } from '../../store/storeContext';
import { IMAGES } from '../../images/image';

type Props = {
  category: string;
};

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const { products } = useContext(ProductState);

  let imgUrl = '';

  if (category === 'phones') {
    imgUrl = IMAGES['category-phones'];
  } else if (category === 'tablets') {
    imgUrl = IMAGES['category-tablets'];
  } else {
    imgUrl = IMAGES['category-accessories'];
  }

  const modelsLength = products.filter(
    item => item.category === category,
  ).length;

  return (
    <Link to={`/${category}`} className="categoryCard">
      <img
        src={imgUrl}
        alt={`${category} category`}
        className="categoryCard__image"
      />

      <h3 className="categoryCard__title">
        {category === 'phones' ? `mobile ${category}` : category}
      </h3>

      <p className="smallText categoryCard__models">
        {`${modelsLength} models`}
      </p>
    </Link>
  );
};
