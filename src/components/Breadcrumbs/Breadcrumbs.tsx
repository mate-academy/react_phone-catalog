import React from 'react';
import style from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';
import { Icon } from '../ui/Icon/Icon';
import classNames from 'classnames';

type Props = {
  category?: string;
  productName?: string;
};

const categoryText: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const Breadcrumbs: React.FC<Props> = ({ category, productName }) => {
  return (
    <div className={style.breadcrumbs}>
      <Link to="/">
        <Icon
          className={classNames(
            style.breadcrumbs__icon,
            style['breadcrumbs__icon--home'],
          )}
          nameIcon="home"
        />
      </Link>

      {category && (
        <>
          <Icon className={style.breadcrumbs__icon} nameIcon="right" />
          <Link
            className={style.breadcrumbs__category}
            to={`/${category.toLowerCase()}`}
          >
            {categoryText[category] || category}
          </Link>
        </>
      )}

      {productName && (
        <>
          <Icon className={style.breadcrumbs__icon} nameIcon="right" />
          <span className={style.breadcrumbs__name}>
            {categoryText[productName] || productName}
          </span>
        </>
      )}
    </div>
  );
};
