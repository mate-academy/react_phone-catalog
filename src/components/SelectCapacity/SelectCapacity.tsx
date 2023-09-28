import './SelectCapacity.scss';

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { NamesByLinks } from '../../types/NamesByLinks';
import { ProductShort } from '../../types/ProductShort';
import { getState } from '../../helpers/getState';

type Props = {
  title: string,
  similarProducts: ProductShort[],
};

export const SelectCapacity: React.FC<Props> = ({
  title, similarProducts,
}) => {
  const { pathname, search } = useLocation();

  const getClassForLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'select-capacity__link', { 'is-active': isActive },
    );
  };

  return (
    <div className="select-capacity">
      <p>{title}</p>

      <ul className="select-capacity__list">
        {similarProducts.map(pr => (
          <li key={pr.id}>
            <NavLink
              to={`${NamesByLinks.Phones}/${pr.phoneId}`}
              state={getState(pathname, search)}
              className={getClassForLink}
            >
              {`${pr.capacity.slice(0, -2)} GB`}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
