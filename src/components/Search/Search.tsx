import React from 'react';

export const Search = () => (
  <form action="./" className="Form">
    <label htmlFor="search" className="Form__Field Form__Field--search">
      <input
        type="text"
        className="Form__TextInput"
        placeholder="Search in phones..."
      />
    </label>
  </form>
);
