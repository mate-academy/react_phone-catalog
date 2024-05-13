import React from 'react';
import { Link } from 'react-router-dom';
import './PurchaseNavButtons.scss';

type Props = {
  className?: string;
};

export const PurchaseNavButtons: React.FC<Props> = ({ className }) => {
  return (
    <div className={className ? `purchases ${className}` : 'purchases'}>
      <Link
        to={{
          pathname: '/favourites',
        }}
        // state={{ from: location.pathname }}
        className="purchases__button"
      >
        <div className="icon icon--favourite">
          <div className="counter">{1}</div>
        </div>
      </Link>
      <Link
        to={{
          pathname: '/cart',
        }}
        // state={{ from: location.pathname }}
        className="purchases__button"
      >
        <div className="icon icon--cart">
          <div className="counter">{1}</div>
        </div>
      </Link>
    </div>
  );
};
