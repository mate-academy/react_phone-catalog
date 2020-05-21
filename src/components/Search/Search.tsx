import React from 'react';

import './Search.scss';

export const Search = () => (
  <form action="./" className="Search">
    <label htmlFor="search" className="Search__Label">
      <input
        type="text"
        className="Search__Input"
        placeholder="Search in phones..."
      />
      <button type="button" className="Search__Button" />
    </label>
  </form>
);
