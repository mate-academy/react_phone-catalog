import * as React from 'react';
import { useLocation } from 'react-router-dom';

export const NoMatch = () => {
  const location = useLocation();

  return (
    <main className="main">
      <div>
        <h3>
        No match for
          {' '}
          <code>{location.pathname}</code>
        </h3>
      </div>
    </main>
  );
};
