import React from 'react';
import './CharacteristicsTable.scss';

type Characteristic = {
  name: string;
  value?: string;
};

type Props = {
  characteristics: Characteristic[];
};

export const CharacteristicsTable: React.FC<Props> = ({ characteristics }) => {
  return (
    <div className="details">
      {characteristics.map(({ name, value }) => (
        <div className="details__row" key={name}>
          <div className="details__name">{name}</div>
          <div className="detail__value">{value || '-'}</div>
        </div>
      ))}
    </div>
  );
};
