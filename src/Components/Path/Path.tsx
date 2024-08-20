import React from 'react';
import { Link } from 'react-router-dom';

import './Path.scss';
import classNames from 'classnames';

type Props = {
  category: string;
  productId?: string;
};

export const Path: React.FC<Props> = ({ category, productId }) => {
  const categoryFirstLetter = `${category[0].toUpperCase()}${category.slice(1)}`;

  return (
    <div className="path">
      <Link to="/" className="path__icon-home" aria-label="link to home page" />

      <div className="path__icon-arrow-right" />

      <Link
        to={`/${category.toLowerCase()}`}
        className={classNames('path__return-text', {
          'path__return-text--black': productId,
        })}
      >
        {categoryFirstLetter}
      </Link>

      {productId && (
        <>
          <div className="path__icon-arrow-right" />

          <p className="path__return-text">{productId}</p>
        </>
      )}
    </div>
  );
};
