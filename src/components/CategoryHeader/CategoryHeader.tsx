/* eslint-disable max-len */
import classNames from 'classnames';
import './CategoryHeader.scss';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  category: 'phones' | 'tablets' | 'accessories' | 'favorites';
  categoryTitle?: string | undefined;
  productCount?: number | undefined;
  filterComponent?: React.ReactNode;
};

export const CategoryHeader: React.FC<Props> = ({
  category,
  categoryTitle,
  productCount,
  filterComponent,
}) => {
  const location = useLocation();

  return (
    <div className="category-header">
      <div className="category-header__link text">
        <Link
          to="/"
          className="icon icon--home category-header__link-home"
        ></Link>

        <span className="category-header__link--arrow"></span>

        <Link
          to={`/${category}`}
          className={classNames(
            'category-header__link--products',
            'text__body',
            {
              'active-link':
                location.pathname.split('/').length > 2 && categoryTitle,
            },
          )}
        >
          {category}
        </Link>

        {categoryTitle && location.pathname.split('/').length > 2 && (
          <>
            <span className="category-header__link--arrow"></span>
            <Link
              to={`/${categoryTitle}`}
              className="category-header__link--products text__body"
            >
              {categoryTitle}
            </Link>
            <br />
            <div className="category-header__link-bottom">
              <span className="icon icon--arrow-up icon--arrow-up--rotate"></span>

              <Link
                to=".."
                relative="path"
                className="category-header__link--back text__body"
              >
                Back
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="category-header__text text">
        <h1 className="category-header__text--title text__title">
          {categoryTitle}
        </h1>

        {productCount !== undefined && (
          <p className="category-header__text--description text__body">
            {productCount} models
          </p>
        )}
      </div>

      {filterComponent && <div className="filter">{filterComponent}</div>}
    </div>
  );
};
