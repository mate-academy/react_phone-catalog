import React from 'react';
import './ItemTech.scss';

type Props = {
  itemsTech: {
    title: string;
    value: string | string[];
  }[];
  headline?: string;
};

export const ItemTech: React.FC<Props> = ({ itemsTech, headline }) => {
  return (
    <div className="item-tech">
      {headline && <h3 className="item-tech__title">{headline}</h3>}
      <ul className="item-tech__list">
        {itemsTech.map(({ title, value }) => {
          return (
            <li key={title} className="item-tech__item">
              <p className="item-tech__name">
                {title}
                <span className="item-tech__value">
                  {typeof value === 'string' ? value : value.join(', ')}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
