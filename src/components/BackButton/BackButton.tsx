import React from 'react';
import { Link } from 'react-router-dom';
import './BackButton.scss';

type BackButtonProps = {
  title: string;
  isFullDetailsOfProduct?: boolean;
  nameProduct?: string;
};

export const BackButton: React.FC<BackButtonProps> = ({
  title,
  isFullDetailsOfProduct,
  nameProduct,
}) => {
  return (
    <>
      <div className="back">
        <Link to="/">
          <img
            className="back__home"
            src="/img/icons/backHome.svg"
            alt="back home"
          />
        </Link>
        <img
          className="back__arrow"
          src="/img/icons/backHomeArrow.svg"
          alt="arrow home"
        />
        <Link to="/phones" className="back__title">
          {title}
        </Link>
        {isFullDetailsOfProduct && (
          <>
            <img
              className="back__arrow"
              src="/img/icons/backHomeArrow.svg"
              alt="arrow home"
            />
            <p className="back__title">{nameProduct}</p>
          </>
        )}
      </div>
      {isFullDetailsOfProduct && (
        <Link to="/" className="back__add">
          <img
            className="back__arrow back__arrow--left"
            src="/img/icons/backHomeArrow.svg"
            alt="arrow home"
          />
          <p className="back__title">Back</p>
        </Link>
      )}
    </>
  );
};
