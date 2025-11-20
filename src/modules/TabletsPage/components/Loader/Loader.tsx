import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="spinner" aria-hidden />
      <p>Loading...</p>
    </div>
  );
};
