import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { DetailType } from '../../../helpers/types/DetailType';
import './Capacities.scss';

type Props = {
  product: DetailType,
};

export const Capacities: React.FC<Props> = ({ product }) => {
  const {
    capacityAvailable: capacities,
    namespaceId,
    capacity,
    color,
  } = product;

  return (
    <div className="capacities">
      <p className="capacities__name">Select capasity</p>
      <ul className="capacities__wrapper">
        {capacities.map(cap => (
          <Link
            to={`/phones/${namespaceId}-${cap.toLowerCase()}-${color}`}
            replace
            key={cap}
            type="button"
            aria-label="button"
            className={classNames('capacities__capacity', {
              'capacities__capacity--selected': cap === capacity,
            })}
          >
            {cap}
          </Link>
        ))}
      </ul>
    </div>
  );
};
