import React from 'react';
import './Breadcrumbs.scss';
import { Link, useLocation } from 'react-router-dom';
import { icons } from '../../../constants/icons';
import { Icon } from '../Icon';
import classNames from 'classnames';

export const Breadcrumbs: React.FC = () => {
  const currentPath = useLocation().pathname.split('/');

  const capitalizeFirstLetter = (word: string) => {
    if (!word) {
      return;
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const capitalizeProductName = (productName: string) => {
    return productName
      .split('-')
      .map(namePart => capitalizeFirstLetter(namePart))
      .join(' ');
  };

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__container">
        <Link to="/" className="breadcrumbs__link">
          <Icon icon={icons.home} />
        </Link>

        {currentPath[1] && (
          <>
            <Icon icon={icons.arrowRightLight} />
            <Link
              to={`/${currentPath[1]}`}
              className={classNames('breadcrumbs__link', {
                'breadcrumbs__link--current': currentPath.length === 2,
              })}
            >
              {capitalizeFirstLetter(currentPath[1])}
            </Link>
          </>
        )}

        {currentPath[2] && (
          <>
            <Icon icon={icons.arrowRightLight} />
            <Link
              to={`/${currentPath[1]}/${currentPath[2]}`}
              className={classNames('breadcrumbs__link', {
                'breadcrumbs__link--current': currentPath.length === 3,
              })}
            >
              {capitalizeProductName(currentPath[2])}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
