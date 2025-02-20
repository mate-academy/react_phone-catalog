import React from 'react';
import './ItemInfo.scss';

type Props = {
  availibleData: string[];
  type: 'color' | 'capacity';
};

export const ItemInfo: React.FC<Props> = ({ availibleData, type }) => {
  return (
    <div className="item-info">
      <p className="item-info__name">Available colors</p>
      <ul className="item-info__list">
        {availibleData.map(data => {
          return (
            <li key={data} className="item-info__item">
              {type === 'color' ? (
                <a href="#" className="item-info__link-color">
                  <div
                    className="item-info__link-color-form"
                    style={{ background: `${data}` }}
                  ></div>
                </a>
              ) : (
                <a href="#" className="item-info__link-capacity">
                  <div className="item-info__link-capacity-form">{data}</div>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
