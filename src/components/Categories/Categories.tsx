import { Link } from 'react-router-dom';
import './Categories.scss';
import React from 'react';

interface ProductNumbers {
  phones: number;
  tablets: number;
  accessories: number;
}

type Props = {
  productNumbers: ProductNumbers;
};

export const Categories: React.FC<Props> = ({
  productNumbers = { phones: 0, accessories: 0, tablets: 0 },
}) => (
  <section className="categories">
    <h2 className="categories__title">Shop by category</h2>
    <div className="categories__content">
      <ul className="categories__list">
        <li className="categories__item">
          <Link className="categories__link" to={'/phones'}>
            <div
              className="
                categories__image
                categories__image--category--phones
                "
            />
            <h3 className="categories__subtitle">Mobile phones</h3>
            <p className="categories__models-number">
              {productNumbers.phones} models
            </p>
          </Link>
        </li>

        <li className="categories__item">
          <Link className="categories__link" to={'/tablets'}>
            <div
              className="categories__image
              categories__image--category--tablets"
            />
            <h3 className="categories__subtitle">Tablets</h3>
            <p className="categories__models-number">
              {productNumbers.tablets} models
            </p>
          </Link>
        </li>

        <li className="categories__item">
          <Link className="categories__link" to={'/accessories'}>
            <div
              className="
              categories__image
              categories__image--category--accessories
              "
            />
            <h3 className="categories__subtitle">Accessories</h3>
            <p className="categories__models-number">
              {productNumbers.accessories} models
            </p>
          </Link>
        </li>
      </ul>
    </div>
  </section>
);
