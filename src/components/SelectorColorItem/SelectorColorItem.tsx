import React from 'react';
import './SelectorColorItem.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { productColors } from '../../helpers/utils/productColors';

type Props = {
  selector: string;
  link: string | null;
  current: string;
};

export const SelectorColorItem: React.FC<Props> = ({
  selector,
  link,
  current,
}) => {
  return (
    <li
      className={classNames('color-item', {
        'color-item--active': selector === current,
      })}
      key={link}
    >
      <Link to={link || ''} aria-disabled={!link || selector === current}>
        <div
          className="color-item__color"
          style={{
            backgroundColor:
              productColors[selector] || // eslint-disable-line
              selector,
          }}
        />
      </Link>
    </li>
  );
};
