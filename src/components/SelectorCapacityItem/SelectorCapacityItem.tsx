import React from 'react';
import './SelectorCapacityItem.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  selector: string;
  link: string | null;
  current: string;
};

export const SelectorCapacityItem: React.FC<Props> = ({
  selector,
  link,
  current,
}) => {
  return (
    <li
      className={classNames('capacity-item', {
        'capacity-item--active': selector === current,
      })}
      key={link}
    >
      <Link
        to={link || ''}
        aria-disabled={!link || selector === current}
        className={classNames('capacity-item__link', {
          'capacity-item__link--active': selector === current,
        })}
      >
        {selector}
      </Link>
    </li>
  );
};
