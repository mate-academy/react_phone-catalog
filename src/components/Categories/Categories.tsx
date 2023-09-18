import React from 'react';
import { Link } from 'react-router-dom';

import './Categories.scss';
import categoryPhones from '../../assets/img/category-phones.png';
import categoryTablets from '../../assets/img/category-tablets.png';
import categoryAccessories from '../../assets/img/category-accessories.png';

type Props = {
  phonesLength: number,
};

export const Categories: React.FC<Props> = ({ phonesLength }) => {
  return (
    <div className="container">
      <div className="categories">
        <h1 className="categories__title title">
          Shop by category
        </h1>

        <div className="categories__content">
          <div className="categories__card">
            <Link
              to="/phones"
              className="categories__link"
              data-cy="categoryLinksContainer"
            >
              <div className="categories__wrapper categories__wrapper--phones">
                <img
                  src={categoryPhones}
                  alt="Phones category"
                  className="categories__img categories__img--phones"
                />
              </div>

              <h2 className="categories__name">
                Mobile phones
              </h2>

              <span className="categories__quantity">{`${phonesLength} models`}</span>
            </Link>
          </div>

          <div className="categories__card">
            <Link
              to="/tablets"
              className="categories__link"
              data-cy="categoryLinksContainer"
            >
              <div className="categories__wrapper categories__wrapper--tablets">
                <img
                  src={categoryTablets}
                  alt="Phones category"
                  className="categories__img categories__img--tablets"
                />
              </div>

              <h2 className="categories__name">
                Tablets
              </h2>

              <span className="categories__quantity">0 models</span>
            </Link>
          </div>

          <div className="categories__card">
            <Link
              to="/accessories"
              className="categories__link"
              data-cy="categoryLinksContainer"
            >
              <div
                className="categories__wrapper categories__wrapper--accessories"
              >
                <img
                  src={categoryAccessories}
                  alt="Phones category"
                  className="categories__img categories__img--accessories"
                />
              </div>

              <h2 className="categories__name">
                Accessories
              </h2>

              <span className="categories__quantity">0 models</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
