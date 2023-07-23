import React from 'react';
import './propertyList.scss';

export type Props = {
  properties: {
    [key: string]: string,
  },
};

export const PropertyList: React.FC<Props> = ({ properties }) => {
  return (
    <div className="properties">
      {Object.keys(properties).map(property => (
        <div key={property} className="properties__item">
          <p className="properties__text card__text_light-gray">{property}</p>
          <p className="properties__text">
            {properties[property]}
          </p>
        </div>
      ))}
    </div>
  );
};
