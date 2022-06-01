import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.scss';

type Props = {
  title: string;
  subtitle?: string;
};

export const PageHeader: React.FC<Props> = React.memo(({ title, subtitle }) => (
  <div className="page-header">
    <div className="container">
      <div className="page-header__content">
        <Link to="/" className="page-header__icon">icon</Link>
        <span className="page-header__arrow">arrow</span>
        <h4 className={classNames(
          'page-header__title',
          { 'page-header__title--with-subtitle': subtitle },
        )}
        >
          {subtitle ? (
            <Link
              className="page-header__title-link"
              to={`/${title}`}
            >
              {title}
            </Link>
          ) : (
            <span
              className="page-header__title"
            >
              {title}
            </span>
          )}

        </h4>
        {subtitle && (
          <>
            <span className="page-header__arrow">arrow</span>
            <h4 className="page-header__title">{subtitle}</h4>
          </>
        )}
      </div>
    </div>
  </div>
));
