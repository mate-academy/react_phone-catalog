import './Breadcrumbs.scss';
import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import {
  ReactComponent as HomeIcon,
} from '../../images/icons/home.svg';
import {
  ReactComponent as ArrowRigth,
} from '../../images/icons/arrow_rigth.svg';

const getLinkClass = ({ isActive }: { isActive: boolean }) => cn(
  'breadcrumbs__link', { 'breadcrumbs__link--active': isActive },
);

type Props = {
  data: {
    category: { name: string, url: string },
    product?: { name: string, url: string },
  };
};

export const Breadcrumbs: React.FC<Props> = ({ data }) => {
  const { category, product } = data;

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <NavLink className="breadcrumbs__home" to="/">
        <HomeIcon />
      </NavLink>
      <div className="breadcrumbs__arrow">
        <ArrowRigth />
      </div>
      <NavLink
        className={!product ? getLinkClass : 'breadcrumbs__link'}
        to={`../../${category.url}`}
      >
        {category.name}
      </NavLink>
      {product && (
        <>
          <div className="breadcrumbs__arrow">
            <ArrowRigth />
          </div>
          <NavLink className={getLinkClass} to={`../${product.url}`}>
            {product.name}
          </NavLink>
        </>
      )}
    </div>
  );
};
