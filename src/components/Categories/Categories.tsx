import React from 'react';
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
          <div className="categories__img categories__img-phones">
            <img src="_new/img/category-phones.png" alt="Phones" />
          </div>

          <h3 className="categories__subtitle">
            Mobile phones
          </h3>

          <p className="categories__count">
            {`${phonesData?.length} models`}
          </p>
        </div>

        <div className="categories__item">
          <div className="categories__img categories__img-tablets">
            <img src="_new/img/category-tablets.png" alt="Tablets" />
          </div>

          <h3 className="categories__subtitle">
            Tablets
          </h3>

          <p className="categories__count">
            0 models
          </p>
        </div>

        <div className="categories__item">
          <div className="categories__img categories__img-accessories">
            <img src="_new/img/category-accessories.png" alt="Tablets" />
          </div>

          <h3 className="categories__subtitle">
            Accessories
          </h3>

          <p className="categories__count">
            0 models
          </p>
        </div>
      </div>
    </>
  );
};
