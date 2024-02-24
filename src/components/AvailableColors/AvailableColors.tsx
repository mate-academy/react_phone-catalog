import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import './AvailableColors.scss';
import { getColorHex } from '../../helpers/colorHelper';

type Props = {
  colorsAvailable: string[];
};

export const AvailableColors: React.FC<Props> = React
  .memo(({ colorsAvailable }) => {
    const { productId } = useParams();
    const preparedId = productId?.split('-').slice(0, -1).join('-');

    return (
      <div className="available-colors">
        <p className="available-colors__title">Available colors</p>

        <div className="available-colors__box">
          {colorsAvailable.map(color => (
            <NavLink
              key={color}
              to={`../${preparedId}-${color}`}
              className={
                ({ isActive }) => classNames('available-colors__item-box', {
                  'available-colors__item-box--active': isActive,
                })
              }
            >
              <div
                className="available-colors__item"
                style={{ backgroundColor: getColorHex(color) }}
              />
            </NavLink>
          ))}
        </div>
      </div>
    );
  });
