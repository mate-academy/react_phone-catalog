import React from 'react';
import './Search.scss';

export const Search: React.FC = () => {
  return (
    <>
      <input
        type="text"
        className="search"
        placeholder="Search in ..."
      />
    </>
  );
};
