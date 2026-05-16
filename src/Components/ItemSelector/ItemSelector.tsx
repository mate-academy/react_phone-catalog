import React from 'react';
import { NavLink } from 'react-router-dom';
import { Colors } from '../../utils/Colors';
import './ItemSelector.scss';

type Props = {
  availibleData: { optionValue: string; url: string }[];
  type: 'color' | 'capacity';
};

export const ItemSelector: React.FC<Props> = ({ availibleData, type }) => {
  return (
    <div className="item-selector">
      <p className="item-selector__title">
        {type === 'color' ? 'Available colors' : 'Select capacity'}
      </p>

      <ul className="item-selector__list">
        {availibleData.map(({ optionValue, url }) => {
          return (
            <li key={optionValue} className="item-selector__item">
              {type === 'color' ? (
                <NavLink
                  to={url}
                  className={({ isActive }) =>
                    `item-selector__link item-selector__link--color ${
                      isActive ? 'item-selector__link--color--active' : ''
                    }`
                  }
                >
                  <div
                    className="item-selector__link--color--circle"
                    style={{
                      backgroundColor: `${Colors[optionValue]}`,
                    }}
                  ></div>
                </NavLink>
              ) : (
                <NavLink
                  to={url}
                  className={({ isActive }) =>
                    `item-selector__link item-selector__link--capacity ${
                      isActive ? 'item-selector__link--capacity--active' : ''
                    }`
                  }
                >
                  {optionValue}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
