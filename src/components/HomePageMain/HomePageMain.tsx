import React, { FC } from 'react';
import './_HomePageMain.scss';
import { Link } from 'react-router-dom';
import { Slider } from '../Slider';
import accessories from '../../assets/accessories.png';
import tablets from '../../assets/tablets.png';
import phonesImage from '../../assets/phones.png';
import { SmallCatalog } from '../SmallCatalog';

export const HomePageMain: FC = () => (

  <section className="homePage">
    <div className="homePage__container wrapper">

      <Slider />

      <SmallCatalog titleName="Hot prices" />

      <div className="homePage__byCategory">
        <h3 className="homePage__title">Shop by category</h3>
        <div className="homePage__category-main">
          <div className="homePage__categories">

            <div className="homePage__category">
              <img
                src={phonesImage}
                alt="category_phones"
                className="homePage__img-phones"
              />
              <Link
                to="/phones"
                className="homePage__category-link"
              >
                    Mobile phones
              </Link>
              <p className="homePage__category-text">71 models</p>
            </div>
          </div>
          <div className="homePage__category">
            <img
              src={tablets}
              alt="category_tablets"
              className="homePage__img-phones"
            />
            <Link
              to="/tablets"
              className="homePage__category-link"
            >
                    Tablets
            </Link>
            <p className="homePage__category-text">number models</p>
          </div>
          <div className="homePage__category">
            <img
              src={accessories}
              alt="category_accessories"
              className="homePage__img-phones"
            />
            <Link
              to="accessories"
              className="homePage__category-link"
            >
                    Accessories
            </Link>
            <p className="homePage__category-text">number models</p>
          </div>
        </div>
      </div>

      <SmallCatalog titleName="Brand new models" />

    </div>
  </section>

);
