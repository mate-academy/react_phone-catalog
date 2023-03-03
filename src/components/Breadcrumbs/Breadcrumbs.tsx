import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';
import home from '../../images/home.svg';
import arrowRight from '../../images/arrow-right.svg';

type Props = {
  link?: string;
  text: string;
};

export const Breadcrumbs: React.FC<Props> = ({ link, text }) => {
  const linkText = link
    ? link[0].toUpperCase() + link.slice(1)
    : '';

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <Link to="/" className="breadcrumbs__item breadcrumbs__item--link">
        <img src={home} alt="home icon" />
      </Link>

      <img src={arrowRight} alt="arrow right" />

      {link && (
        <>
          <Link to={`../../${link}s`} className="breadcrumbs__item breadcrumbs__item--link">
            {`${linkText}s`}
          </Link>

          <img src={arrowRight} alt="arrow right" />
        </>
      )}

      <div className="breadcrumbs__item">
        {text}
      </div>
    </div>
  );
};

Breadcrumbs.defaultProps = {
  link: '',
};
