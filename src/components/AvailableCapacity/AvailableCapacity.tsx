import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import './AvailableCapacity.scss';

type Props = {
  availableCapacity: string[];
};

function getProductId(productId: string, capacity: string): string {
  const arrFromId = productId.split('-');

  arrFromId.splice(-2, 1, capacity);

  return arrFromId.join('-').toLowerCase();
}

export const AvailableCapacity: React.FC<Props> = React
  .memo(({ availableCapacity }) => {
    const { productId } = useParams();

    return (
      <div className="available-capacity">
        <p className="available-capacity__title">Available capacity</p>

        <div className="available-capacity__box">
          {availableCapacity.map(capacity => (
            <NavLink
              key={capacity}
              to={`../${getProductId(productId || '', capacity)}`}
              className={
                ({ isActive }) => classNames('available-capacity__item-box', {
                  'available-capacity__item-box--active': isActive,
                })
              }
            >
              <div
                className={
                  classNames(
                    'available-capacity__item',
                    {
                      'available-capacity__item--active':
                        productId?.includes(capacity.toLowerCase()),
                    },
                  )
                }
              >
                {capacity}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    );
  });
