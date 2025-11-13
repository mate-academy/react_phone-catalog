import React, { useContext } from 'react';
import './Breadcrumbs.scss';
import { icons } from '../../../../global-assets/static';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import '../../../../i18next';
import { LinkList } from '../../types/LinkList';
import { TranslationContext } from '../../../../i18next/shared';

export const Breadcrumbs: React.FC = () => {
  const { navList } = useContext(TranslationContext);
  const [searchParams] = useSearchParams();
  const IconHome = icons.home.valuePath;
  const IconArrow = icons.arrowRight.valuePath;
  const location = useLocation();
  const pageNames = location.pathname.toString().slice(1);

  const getPath = () => {
    const pathSequence: string[] = pageNames.split('/');

    const listOfPath: LinkList[] = pathSequence.map(path => {
      return {
        path: path,
        title: navList.find(pathItem => pathItem.link === path)?.title || path,
      };
    });

    return listOfPath.map((path: LinkList) => {
      return {
        ...path,
        title: path.title
          .split('-')
          .map(part => part[0].toUpperCase() + part.slice(1))
          .join('-'),
      };
    });
  };

  const pathSequence: LinkList[] = getPath();
  const isActiveLink: LinkList['path'] =
    pathSequence[pathSequence.length - 1].path;

  return (
    <div className="products-nav">
      <div className="products-nav__wrapper">
        <Link to="/" className="products-nav__icon">
          <IconHome />
        </Link>
        {pathSequence.map(pathItem => (
          <div className="products-nav__wrapper" key={pathItem.path}>
            <IconArrow className="products-nav__icon products-nav__icon--arrow" />
            <Link
              to={{
                pathname: `/${pathItem.path.toLowerCase()}`,
              }}
              state={{ search: searchParams.toString() }}
              className={classNames('products-nav__text', {
                'products-nav__text--active': isActiveLink === pathItem.path,
              })}
            >
              <p>{pathItem.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
