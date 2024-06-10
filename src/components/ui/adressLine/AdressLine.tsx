import React from 'react';
import './AdressLineStyle.scss';

interface Props {
  adress: string[];
}

const AdressLine: React.FC<Props> = ({ adress }) => {
  const formattedPath = adress.filter(elem => elem !== '');

  return (
    <div className="adress">
      <img src="icons/Home.svg" alt="" className="adress__icon" />
      {formattedPath.map(elem => (
        <>
          <img
            src="icons/arrow-left-gray.png"
            alt=""
            className="adress__arrow"
          />
          <div className="adress__elem">{elem}</div>
        </>
      ))}
    </div>
  );
};

export default AdressLine;
