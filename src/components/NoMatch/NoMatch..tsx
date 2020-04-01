import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

export const NoMatch: FC = () => {
  const location = useLocation();

  return (
    <main className="main">
      <div>
        <h3>
        No match for this URL
          {' '}
          <code>{location.pathname}</code>
        </h3>
      </div>
    </main>
  );
};
