import React from 'react';

import { Link } from 'react-router-dom';
import { headerLinks } from '../../helpers/config';


import './Categories.scss';

export const Categories: React.FC = () => {
  return (
    <div className="category categories-wrapper">
      {headerLinks.splice(1).map(({ name, url, imgUrl }) => {
        return (
          <div className="category__item" key={name}>
            <Link
              to={url}
              className="category__link"
            >
              <img src={imgUrl} alt={name} className="category__img img-responsive" />
            </Link>

            <h3 className="category__title">
              <Link
                to={url}
                className="category__link--title"
              >
                {name}
              </Link>
            </h3>

            <span className="category__count">42 models</span>
          </div>
        );
      })}
    </div>
  );
};
