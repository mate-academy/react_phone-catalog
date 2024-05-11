import React, { useState } from 'react';

export const NavSearch = () => {
  const [query, setQueary] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueary(e.target.value);
  };

  return (
    <input
      type="search"
      className="search"
      value={query}
      placeholder={'Search'}
      onChange={handleSearch}
    />
  );
};
