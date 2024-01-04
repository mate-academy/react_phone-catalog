import React from 'react';
import { DetailType } from '../../../helpers/types/DetailType';
import { capitalize } from '../../../helpers/utils/capitalize';
import './LongInfo.scss';

type Props = {
  product: DetailType,
};

export const LongInfo: React.FC<Props> = ({ product }) => {
  const {
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  } = product;

  const info = {
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell: cell.join(', '),
  };

  return (
    <div className="longInfo">
      {Object.entries(info).map(([key, value]) => (
        <div key={value} className="longInfo__wrapper">
          <p className="longInfo__name">
            {capitalize(key)}
          </p>
          <p className="longInfo__info">{value || '-'}</p>
        </div>
      ))}
    </div>
  );
};
