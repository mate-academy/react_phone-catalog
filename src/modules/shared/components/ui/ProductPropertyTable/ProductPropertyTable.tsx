import React from 'react';
import './ProductPropertyTable.scss';
import classNames from 'classnames';

type ProductPropertyTableProps = {
  properties: {
    name: string;
    value: string | string[] | null;
  }[];
  textStyle: 'small' | 'medium';
};

export const ProductPropertyTable: React.FC<ProductPropertyTableProps> = ({
  properties,
  textStyle,
}) => {
  return (
    <div
      className={classNames('property-table', {
        'property-table--is-medium': textStyle === 'medium',
      })}
    >
      <div className="product-card__info-wrapper">
        {properties.map(property => (
          <div className="property-table__info" key={property.name}>
            <p className="property-table__info-property">
              {property.name[0].toUpperCase() + property.name.slice(1)}
            </p>
            {property.value && Array.isArray(property.value) ? (
              <p className="property-table__info-value">
                {property.value.join(', ')}
              </p>
            ) : (
              <p className="property-table__info-value">
                {property.value ?? ''}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
