import './SelectColors.scss';
import React from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { ProductShort } from '../../types/ProductShort';
import { NamesByLinks } from '../../types/NamesByLinks';
import { getState } from '../../helpers/getState';

type Props = {
  title: string,
  similarProducts: ProductShort[],
};

export const SelectColors: React.FC<Props> = ({
  title, similarProducts,
}) => {
  const { pathname, search } = useLocation();

  const getClassForLink = (isActive: boolean, color: string) => {
    return classNames(
      'select-colors__link',
      `select-colors__color-${color}`,
      { 'is-active': isActive },
    );
  };

  return (
    <>
      <p>{title}</p>

      <ul className="select-colors__list">
        {similarProducts.map(pr => (
          <li key={pr.id}>
            <NavLink
              to={`${NamesByLinks.Phones}/${pr.phoneId}`}
              state={getState(pathname, search)}
              className={({ isActive }) => {
                return getClassForLink(isActive, pr.color);
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
