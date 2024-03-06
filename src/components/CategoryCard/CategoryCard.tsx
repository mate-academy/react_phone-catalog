import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';
import { StateStore } from '../../store/StoreContext';

type Props = {
  category: { name: string; imgUrl: string };
};

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const { products } = useContext(StateStore);
  const { name, imgUrl } = category;

  const modelsLength = [...products].filter(
    item => item.category === name,
  ).length;

  return (
    <Link to={`/${name}`} className="categoryCard">
      <img
        className="categoryCard__image"
        src={imgUrl}
        alt={`${name} category`}
      />
      <h3 className="categoryCard__title">
        {name === 'phones' ? `mobile ${name}` : name}
      </h3>
      <p className="categoryCard__models text">{`${modelsLength} models`}</p>
    </Link>
  );
};
