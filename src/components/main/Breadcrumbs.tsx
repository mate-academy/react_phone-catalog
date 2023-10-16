import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import { BreadcrumbsElement } from '../../helpers/types/BreadcrumbsElement';

type BreadcrumbsProps = {
  path: BreadcrumbsElement[]
};

export const Breadcrumbs = ({ path }: BreadcrumbsProps) => (
  <div data-cy="breadCrumbs" className="products__breadcrumbs breadcrumbs">
    <Link to="/">
      <img
        className="breadcrumbs__image"
        src="img/home-breadcrumbs.svg"
        alt="home"
      />
    </Link>

    {path.map((pathElement, index) => {
      const { link, text } = pathElement;

      return (
        <Fragment key={link + text}>
          <img
            className="breadcrumbs__image"
            src="img/arrows/arrow-right-breadcrumbs.svg"
            alt="Arrow right"
          />

          {index === path.length - 1 ? (
            <p className="breadcrumbs__text">{text}</p>
          ) : (
            <Link to={link || ''}>
              <span className="breadcrumbs__text">{text}</span>
            </Link>
          )}
        </Fragment>
      );
    })}
  </div>
);
