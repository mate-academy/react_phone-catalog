import React from 'react';
import { DetailType } from '../../../helpers/types/DetailType';
import { capitalize } from '../../../helpers/utils/capitalize';
import './ShortInfo.scss';

type Props = {
  product: DetailType,
};

export const ShortInfo: React.FC<Props> = ({ product }) => {
  const {
    screen,
    resolution,
    processor,
    ram,
  } = product;

  return (
    <div className="shortInfo">
      {Object.entries({
        screen, resolution, processor, ram,
      }).map(([key, value]) => (
        <div key={value} className="shortInfo__wrapper">
          <p className="shortInfo__name">{capitalize(key)}</p>
          <p className="shortInfo__info">{value || '-'}</p>
        </div>
      ))}
    </div>
  );
};
