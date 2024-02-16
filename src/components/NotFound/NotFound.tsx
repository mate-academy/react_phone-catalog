import React from 'react';

import './NotFound.scss';

const NotFound: React.FC = () => {
  return (
    <>
      <section className="not-found">
        <h1 className="not-found__title">
          404 - Not Found
        </h1>
        <p className="not-found__description">
          The page you are looking for does not exist.
        </p>
      </section>
    </>
  );
};

export default NotFound;
