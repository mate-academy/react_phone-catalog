import './BreadCrumbs.scss';

import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';

export const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const { productsList } = useContext(GlobalContext);

  let currentLink = '';
  let currentName = '';

  const crumbs = pathname.split('/')
    .filter(item => item !== '')
    .map(item => {
      const current = productsList.find(p => p.itemId === item)?.name || '';

      if (currentName) {
        currentName = current;
      } else {
        currentName = item.slice(0, 1).toUpperCase() + item.slice(1);
      }

      currentLink += `/${item}`;

      return {
        name: currentName,
        link: currentLink,
      };
    });

  return (
    <ul className="BreadCrumbs" data-cy="breadCrumbs">
      <li className="BreadCrumbs__item">
        <Link to="../" className="BreadCrumbs__link BreadCrumbs__link--home" />

        <div className="BreadCrumbs__arrow" />
      </li>

      {crumbs.slice(0, -1).map(crumb => (
        <li key={crumb.name} className="BreadCrumbs__item">
          <Link to={`..${crumb.link}`} className="BreadCrumbs__link">
            {crumb.name}
          </Link>

          <div className="BreadCrumbs__arrow" />
        </li>
      ))}

      <li className="BreadCrumbs__item">
        <span className="BreadCrumbs__link BreadCrumbs__link--current">
          {crumbs.pop()?.name}
        </span>
      </li>
    </ul>
  );
};
