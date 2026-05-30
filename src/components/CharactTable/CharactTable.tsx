import React from 'react';
import style from './CharactTable.module.scss';

type Characteristic = {
  name: string;
  value?: string;
};

type Props = {
  characteristics: Characteristic[];
};

export const CharacteristicsTable: React.FC<Props> = ({ characteristics }) => {
  return (
    <div className={style.details}>
      {characteristics.map(({ name, value }) => (
        <div className={style.details__row} key={name}>
          <div className={style.details__name}>{name}</div>
          <div className={style.details__value}>
            <div className={style.details__value}>
              {value && value.length > 20
                ? value.slice(0, 20) + '...'
                : value || '-'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
