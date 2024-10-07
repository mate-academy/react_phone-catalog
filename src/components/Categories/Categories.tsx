import { Link } from 'react-router-dom';
import { HeadingLevel } from '../../types/HeadingLevel';
import { Title } from '../Title';
import React from 'react';

interface Props {
  products: {
    category: string;
  }[];
}

export const Categories: React.FC<Props> = ({ products }) => {
  const phonesCount = products.filter(
    product => product.category === 'phones',
  ).length;
  const tabletsCount = products.filter(
    product => product.category === 'tablets',
  ).length;
  const accessoriesCount = products.filter(
    product => product.category === 'accessories',
  ).length;

  return (
    <div className="categories">
      <Title level={HeadingLevel.h2}>Shop by category</Title>
      <div className="categories__group">
        <div className="categories__item">
          <div className="categories__background">
            <Link to="/phones">
              <img
                src="./img/category-phones.png"
                alt="Phone"
                className="categories__image"
              />
            </Link>
          </div>
          <div className="categories__description">
            <h2 className="categories__name">Mobile phones</h2>
            <p className="categories__count">{phonesCount} models</p>
          </div>
        </div>
        <div className="categories__item">
          <div className="categories__background">
            <Link to="/tablets">
              <img
                src="./img/category-tablets.png"
                alt="Tablet"
                className="categories__image"
              />
            </Link>
          </div>
          <div className="categories__description">
            <h2 className="categories__name">Tablets</h2>
            <p className="categories__count">{tabletsCount} models</p>
          </div>
        </div>
        <div className="categories__item">
          <div className="categories__background">
            <Link to="/accessories">
              <img
                src="./img/category-accessories.png"
                alt="Silicon cases"
                className="categories__image"
              />
            </Link>
          </div>
          <div className="categories__description">
            <h2 className="categories__name">Accessories</h2>
            <p className="categories__count">{accessoriesCount} models</p>
          </div>
        </div>
      </div>
    </div>
  );
};
