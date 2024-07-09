import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Path.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

type Props = {
  category?: string;
  name?: string;
  isOnlyBack?: boolean;
};

export const PathBlock: React.FC<Props> = ({ category, name, isOnlyBack }) => {
  const location = useLocation();
  const allowedPaths = [
    '/products/tablets',
    '/products/phones',
    '/products/accessories',
    '/',
  ];
  const { t } = useTranslation();
  const isFromAllowedPath = allowedPaths.includes(location.state?.from);

  if (isOnlyBack && allowedPaths) {
    return (
      <div className="path">
        <button className="path__back" onClick={() => window.history.back()}>
          <div className="path__arrow path__arrow--back icon icon--arrow"></div>
          <p className="path__back--text body-text">{t('Back')}</p>
        </button>
      </div>
    );
  }

  if (name && isFromAllowedPath) {
    return (
      <>
        <div className="path">
          <Link to={'/home'} className="path__home icon icon--home" />
          <div className="path__arrow icon icon--arrow"></div>
          <Link
            to={`/products/${category}`}
            className={classNames('path__current-link body-text', {
              'color-primary': name,
            })}
          >
            {t(`Link.category.${category}`, { count: 1 })}
          </Link>
          <div className="path__arrow icon icon--arrow"></div>
          <p className="path__current-name body-text">{name}</p>
        </div>
        <button className="path__back" onClick={() => window.history.back()}>
          <div className="path__arrow path__arrow--back icon icon--arrow"></div>
          <p className="path__back--text body-text">{t('Back')}</p>
        </button>
      </>
    );
  }

  return (
    <div className="path">
      <Link to={'/home'} className="path__home icon icon--home" />

      <div className="path__arrow icon icon--arrow"></div>

      <Link
        to={`/products/${category}`}
        className={classNames('path__current-link body-text', {
          'color-primary': name,
        })}
      >
        {t(`Link.category.${category}`, { count: 1 })}
      </Link>
    </div>
  );
};
