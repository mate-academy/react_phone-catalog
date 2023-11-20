import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from '../../type/Phone';

type Props = {
  phones: Phone[];
};

export const Categories: React.FC<Props> = ({ phones }) => {
  return (
    <section className="byCategories homePage__byCategories">
      <div className="byCategories__wrapper">
        <div className="byCategories__top">
          <h1 className="title">Shop by category</h1>
        </div>

        <div
          className="byCategories__categories"
          data-cy="categoryLinksContainer"
        >
          <div className="byCategories__block">
            <Link
              to="/phones"
              className="byCategories__photoLink"
            >
              <img
                src="./images/categories/Phones.png"
                alt="Phones"
                className="byCategories__img"
              />
            </Link>
            <h2 className="byCategories__title">Mobile phones</h2>
            <span className="byCategories__countModels">{`${phones.length} models`}</span>
          </div>

          <div className="byCategories__block">
            <Link
              to="/tablets"
              className="byCategories__photoLink"
            >
              <img
                src="./images/categories/Tablets.png"
                alt="Tablets"
                className="byCategories__img"
              />
            </Link>
            <h2 className="byCategories__title">Tablets</h2>
            <span className="byCategories__countModels">{`${0} models`}</span>
          </div>

          <div className="byCategories__block">
            <Link
              to="/accessories"
              className="byCategories__photoLink"
            >
              <img
                src="./images/categories/Accessories.png"
                alt="Accessories"
                className="byCategories__img"
              />
            </Link>
            <h2 className="byCategories__title">Accessories</h2>
            <span className="byCategories__countModels">{`${0} models`}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
