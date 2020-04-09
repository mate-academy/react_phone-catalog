import React, { FC } from 'react';
import './_NoMatchMain.scss';
import { useLocation } from 'react-router-dom';

export const NoMatchMain: FC = () => {
  const location = useLocation();

  return (
    <section className="noMatch">
      <div className="noMatch__container wrapper">
        <h2 className="noMatch__title">
        No match for this URL
          {' '}
          <code>{location.pathname}</code>
        </h2>
      </div>
    </section>
  );
};
