import { ReactNode, useCallback, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { Item } from '../../types/Item';

import styles from './BreadCrumbs.module.scss';
const {
  breadcrumbs,
  breadcrumbs__link,
  breadcrumbs__icon,
  breadcrumbs__arrow,
  breadcrumbs__text,
  breadcrumbs__textGray,
} = styles;

type BreadCrumbsProps = {
  item?: Item;
};

export const BreadCrumbs = ({ item }: BreadCrumbsProps) => {
  const location = useLocation();
  const { category, itemPage } = useParams();
  const normalizedCategory = useMemo(
    () => category && category[0].toUpperCase() + category.slice(1),
    [category],
  );

  const renderLink = useCallback(
    (to: string, className: string, content: ReactNode) => (
      <Link to={to} className={className}>
        {content}
      </Link>
    ),
    [],
  );

  return (
    <div className={breadcrumbs}>
      {renderLink(
        '/',
        breadcrumbs__link,
        <img
          src={`${import.meta.env.BASE_URL}icons/icon-home.svg`}
          alt="home link"
          className={breadcrumbs__icon}
        />,
      )}

      {location.pathname.startsWith('/user') && (
        <>
          <div className={`${breadcrumbs__icon} ${breadcrumbs__arrow} `} />
          <span
            className={`${breadcrumbs__text} ${itemPage ? breadcrumbs__textGray : ''}`}
          >
            Favourites
          </span>
        </>
      )}

      {category && (
        <>
          <div className={`${breadcrumbs__icon} ${breadcrumbs__arrow} `} />
          {renderLink(
            `/catalog/${category}`,
            breadcrumbs__link,
            <span
              className={`${breadcrumbs__text} ${itemPage ? breadcrumbs__textGray : ''}`}
            >
              {normalizedCategory}
            </span>,
          )}
        </>
      )}

      {itemPage && (
        <>
          <div className={`${breadcrumbs__icon} ${breadcrumbs__arrow} `} />
          <span className={breadcrumbs__text}>{item?.name}</span>
        </>
      )}
    </div>
  );
};
