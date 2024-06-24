import React from 'react';
import './AdressLineStyle.scss';
import { useLocation } from 'react-router-dom';

const AdressLine: React.FC = () => {
  const path = useLocation().pathname;
  const pathComponents = path.split('/');
  const formattedPath = pathComponents.filter(elem => elem !== '');

  return (
    <div className="adress">
      <img src="icons/Home.svg" alt="" className="adress__icon" />
      {formattedPath.map(elem => (
        <div key={elem} className="adress__container">
          <img
            src="/icons/arrow-left-gray.png"
            alt=">"
            className="adress__arrow"
          />
          <div className="adress__elem">{elem}</div>
        </div>
      ))}
    </div>
  );
};

export default AdressLine;
