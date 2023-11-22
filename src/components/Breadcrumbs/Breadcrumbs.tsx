import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';
import classNames from 'classnames';
import home from '../../image/Home.svg';
import right from '../../image/rightGrayNoButton.svg';

type Props = {
  currentPage: string;
};

export const Breadcrumbs: React.FC<Props> = React.memo(({ currentPage }) => {
  const { pathname } = useLocation();
  const params = pathname.split('/');

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      {params.map((crumb, index) => {
        if (index === 0) {
          return (
            <React.Fragment key={crumb}>
              <Link to="/" className="breadcrumbs__home">
                <img
                  src={home}
                  alt="home"
                  className="breadcrumbs__image"
                />
              </Link>
            </React.Fragment>
          );
        }

        if (index === params.length - 1 && currentPage) {
          return (
            <React.Fragment key={crumb}>
              <img
                src={right}
                alt="right"
                className="breadcrumbs__right"
              />
              <Link
                to={`/${params.slice(1, index + 1).join('/')}`}
                className={classNames(
                  'breadcrumbs__text',
                  {
                    'breadcrumbs__text--category':
                      params.length > 1 && index === 1,
                  },
                )}
              >
                {currentPage}
              </Link>
            </React.Fragment>
          );
        }

        const title = crumb.split('-').map((letter) => {
          return letter[0].toUpperCase() + letter.slice(1);
        }).join(' ');

        return (
          <React.Fragment key={crumb}>
            <img src={right} alt="right" className="breadcrumbs__right" />
            <Link
              to={`/${params.slice(1, index + 1).join('/')}`}
              className={classNames(
                'breadcrumbs__text',
                {
                  'breadcrumbs__text--category':
                    params.length > 2 && index === 1,
                },
              )}
            >
              {title}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
});
