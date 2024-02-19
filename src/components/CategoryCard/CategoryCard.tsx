import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateStore } from '../../store/StoreContext';
// import { IMAGES } from '../../images/images';
import './CategoryCard.scss';

type Props = {
  category: string;
};

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const { products } = useContext(StateStore);

  let imgUrl = '';

  if (category === 'phones') {
    imgUrl = '../../images/category-phones.png';
  } else if (category === 'tablets') {
    imgUrl = '../../images/category-tablets.png';
  } else {
    imgUrl = '../../images/category-accessories.png';
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

      {/* <div className="categoryCard__images">
        <div
          className="categoryCard__images categoryCard__image--1"
        />
        <div
          className="categoryCard__images categoryCard__image--2"
        />
        <div
          className="categoryCard__images categoryCard__image--3"
        />
      </div> */}
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
