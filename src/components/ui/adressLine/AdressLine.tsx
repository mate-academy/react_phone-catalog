import React from 'react';
import './AdressLineStyle.scss';
import { Link, useLocation } from 'react-router-dom';
import { PageType } from 'src/types/PageType';

const AdressLine: React.FC = () => {
  const path = useLocation().pathname;
  const pathComponents = path.split('/');
  const formattedPath = pathComponents.filter(elem => elem !== '');
  const isLink = elem =>
    PageType.Accessories === elem ||
    PageType.Accessories === elem ||
    PageType.Tablets == elem;

  return (
    <div className="adress">
      <img src="icons/Home.svg" alt="" className="adress__icon" />
      {formattedPath.map(elem => (
        <div key={elem} className="adress__container">
          <img
            src="icons/arrow-left-gray.png"
            alt=">"
            className="adress__arrow"
          />
          {isLink(elem) ? (
            <Link className="adress__elem" to={`/${elem}`}>
              {elem}
            </Link>
          ) : (
            <div className="adress__elem">{elem}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdressLine;
