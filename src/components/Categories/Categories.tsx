import React from 'react';
import { Link } from 'react-router-dom';

import { Phone } from '../../types/Phone';
import './Categories.scss';

type Props = {
  phonesData: Phone[]
};

export const Categories: React.FC<Props> = ({
  phonesData,
}) => {
  return (
    <>
      <h1 className="section__title categories__title">
        Shop by category
      </h1>

      <div className="categories__list">
        <div className="categories__item">
          <Link to="/phones">
            <div className="categories__img-wrapper">
              <img
                className="categories__img categories__img-phones"
                src="img/category-phones.png"
                alt="Phones"
              />
            </div>
          </Link>

          <Link to="/phones" className="categories__subtitle-link">
            <h3 className="categories__subtitle">
              Mobile phones
            </h3>
          </Link>

          <p className="categories__count">
            {`${phonesData?.length} models`}
          </p>
        </div>

        <div className="categories__item">
          <Link to="/tablets">
            <div className="categories__img-wrapper">
              <img
                className="categories__img categories__img-tablets"
                src="img/category-tablets.png"
                alt="Tablets"
              />
            </div>
          </Link>

          <Link to="/tablets" className="categories__subtitle-link">
            <h3 className="categories__subtitle">
              Tablets
            </h3>
          </Link>

          <p className="categories__count">
            0 models
          </p>
        </div>

        <div className="categories__item">
          <Link to="/accessories">
            <div className="categories__img-wrapper">
              <img
                className="categories__img categories__img-accessories"
                src="img/category-accessories.png"
                alt="Tablets"
              />
            </div>
          </Link>

          <Link to="/accessories" className="categories__subtitle-link">
            <h3 className="categories__subtitle">
              Accessories
            </h3>
          </Link>

          <p className="categories__count">
            0 models
          </p>
        </div>
      </div>
    </>
  );
};
