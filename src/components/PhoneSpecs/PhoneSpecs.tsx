import React from 'react';
import './PhoneSpecs.scss';

type Props = {
  screen: string;
  capacity: string;
  ram: string;
  color: string;
};

export const PhoneSpecs: React.FC<Props> = ({
  screen,
  capacity,
  ram,
  color,
}) => {
  return (
    <div className="phone-specs">
      <div className="phone-specs__param">
        <p className="phone-specs__text">Screen</p>
        <p className="phone-specs__size">{screen.slice(0, 9)}</p>
      </div>
      <div className="phone-specs__param">
        <p className="phone-specs__text">Capacity</p>
        <p className="phone-specs__size">{capacity}</p>
      </div>
      <div className="phone-specs__param">
        <p className="phone-specs__text">RAM</p>
        <p className="phone-specs__size">{ram.slice(0, 1)} GB</p>
      </div>
      <div className="phone-specs__param">
        <p className="phone-specs__text">Color</p>
        <p className="phone-specs__size">{color}</p>
      </div>
    </div>
  );
};
