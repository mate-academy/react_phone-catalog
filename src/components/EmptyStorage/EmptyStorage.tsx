import React from 'react';
import { useLocation } from 'react-router-dom';
import './EmptyStorage.scss';

const EmptyStorage = () => {
  const location = useLocation();

  return (
    <div className="emptyStorage">
      <div className="emptyStorage__content">
        <h1 className="emptyStorage__header">
          {`No items in ${location.pathname.replace('/', '')}`}
        </h1>
      </div>
    </div>
  );
};

export default EmptyStorage;
