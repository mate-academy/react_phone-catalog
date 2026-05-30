import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ProductDetails } from '../../../../types';
import * as Service from '../../../../utils/service';

type Props = {
  selectedProduct: ProductDetails;
};

export const CapacityBlock: React.FC<Props> = ({ selectedProduct }) => {
  const { capacityAvailable, category, namespaceId, color, capacity } =
    selectedProduct;

  return (
    <div className="paramsBlock__capacityBlock">
      <p className="small-text paramsBlock__title">Select capacity</p>

      <div className="paramsBlock__capacityBlock--capacity">
        {capacityAvailable?.map(capValue => (
          <Link
            key={capValue}
            to={`${Service.getNewProductLink(category, namespaceId, capValue, color)}`}
            className={classNames(
              'body-text paramsBlock__capacityBlock--capacity-value',
              {
                'body-text paramsBlock__capacityBlock--capacity-value-active':
                  capacity === capValue,
              },
            )}
          >
            {capValue}
          </Link>
        ))}
      </div>
    </div>
  );
};
