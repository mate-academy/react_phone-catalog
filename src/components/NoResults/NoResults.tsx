import React from 'react';
import { useLocation } from 'react-router-dom';

export const NoResults: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="no-results">
      <h1 className="no-results__title">
        {`No ${pathname.slice(1)} found...`}
      </h1>
    </div>
  );
};
