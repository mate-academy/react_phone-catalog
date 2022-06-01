import classNames from 'classnames';
import React from 'react';
import './Description.scss';

type Props = {
  screen: string;
  capacity: string;
  ram: string;
};

export const createItem = (param: string, value: string, isLarge = false) => (
  <li className={classNames(
    'description__item',
    { 'description__item--large-font-size': isLarge },
  )}
  >
    <span className="description__char">{param}</span>
    <span className="description__value">
      {value || '-'}
    </span>
  </li>
);

export const Description: React.FC<Props> = ({
  screen,
  capacity,
  ram,
}) => {
  return (
    <ul className="description">
      {createItem('Screen', screen)}
      {createItem('Capacity', capacity)}
      {createItem('RAM', ram)}
    </ul>
  );
};
