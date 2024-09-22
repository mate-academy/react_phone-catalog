import React, { useContext } from 'react';
import { CatalogContext } from '../../CatalogContext';
import { Link } from 'react-router-dom';
import { GetPoroductsForView } from '../../utils/GetProductsForView';

interface Props {
  category: string;
}

export const CategoryCart: React.FC<Props> = ({ category }) => {
  const { phonesFromServer, tabletsFromServer, accessoriesFromServer } =
    useContext(CatalogContext);

  let currentCategory: number | undefined;

  switch (category) {
    case 'phones':
      if (phonesFromServer) {
        currentCategory = GetPoroductsForView(phonesFromServer).length;
      }

      break;
    case 'tablets':
      if (tabletsFromServer) {
        currentCategory = GetPoroductsForView(tabletsFromServer).length;
      }

      break;
    case 'accessories':
      if (accessoriesFromServer) {
        currentCategory = GetPoroductsForView(accessoriesFromServer).length;
      }

      break;
    default:
      currentCategory = undefined;
  }

  return (
    <Link to={`/${category}`} className="categories__item">
      <div
        className={`categories__image-container categories__image-container--${category}`}
      >
        <img
          src={`../img/banner-${category}.png`}
          alt="banner"
          className="categories__image"
        />
      </div>

      <h4 className="categories__name">{category}</h4>
      <p className="categories__number">{currentCategory} models</p>
    </Link>
  );
};
