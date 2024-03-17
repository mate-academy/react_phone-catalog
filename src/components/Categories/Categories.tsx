import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../helpers/constants';
import './Categories.scss';

type Props = {
  amount: {
    phones: number;
    tablets: number;
    accessories: number;
  }
};

export const Categories: React.FC<Props> = ({ amount }) => (
  <div
    className="categories"
    data-cy="categoryLinksContainer"
  >
    <h2 className="categories__title">
      Shop by category
    </h2>

    <ul className="categories__list">
      <li className="categories__item">
        <Link to="/phones" className="categories__link">
          <div
            className="categories__image-container
                categories__image-container--phones"
          >
            <img
              src={`${BASE_URL}/img/category-phones.png`}
              alt="phones"
              className="categories__image categories__image--phones"
            />
          </div>

          <h4 className="categories__category-title">
            Mobile phones
          </h4>

          <p className="categories__number">
            {amount.phones === 1 ? (
              '1 model'
            ) : (
              `${amount.phones} models`
            )}
          </p>
        </Link>
      </li>

      <li className="categories__item">
        <Link to="/tablets" className="categories__link">
          <div
            className="categories__image-container
                categories__image-container--tablets"
          >
            <img
              src={`${BASE_URL}/img/category-tablets.png`}
              alt="tablets"
              className="categories__image categories__image--tablets"
            />
          </div>

          <h4 className="categories__category-title">
            Tablets
          </h4>

          <p className="categories__number">
            {amount.tablets === 1 ? (
              '1 model'
            ) : (
              `${amount.tablets} models`
            )}
          </p>
        </Link>
      </li>
      <li className="categories__item">
        <Link to="/accessories" className="categories__link">
          <div
            className="categories__image-container
              categories__image-container--accessories"
          >
            <img
              src={`${BASE_URL}/img/category-accessories.png`}
              alt="phones"
              className="categories__image"
            />
          </div>

          <h4 className="categories__category-title">
            Accessories
          </h4>

          <p className="categories__number">
            {amount.accessories === 1 ? (
              '1 model'
            ) : (
              `${amount.accessories} models`
            )}
          </p>
        </Link>
      </li>
    </ul>
  </div>
);
