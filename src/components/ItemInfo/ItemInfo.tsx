import React from 'react';
import './ItemInfo.scss';
import { NavLink } from 'react-router-dom';
import { Colors } from '../constants/Colors';

type Props = {
  availibleData: { optionValue: string; url: string }[];
  type: 'color' | 'capacity';
};

export const ItemInfo: React.FC<Props> = ({ availibleData, type }) => {
  return (
    <div className="item-info">
      {type === 'color' ? (
        <p className="item-info__name">Available colors</p>
      ) : (
        <p className="item-info__name">Select capacity</p>
      )}

      <ul className="item-info__list">
        {availibleData.map(({ optionValue, url }) => {
          return (
            <li key={optionValue} className="item-info__item">
              {type === 'color' ? (
                <NavLink to={url} className="item-info__link-color">
                  <div
                    className="item-info__link-color-form"
                    style={{ background: `${Colors[optionValue]}` }}
                  ></div>
                </NavLink>
              ) : (
                <a href={url} className="item-info__link-capacity">
                  <div className="item-info__link-capacity-form">
                    {optionValue}
                  </div>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
