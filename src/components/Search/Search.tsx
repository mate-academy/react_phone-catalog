import React from 'react';
import './Search.scss';

type Props = {
  listTitle: string;
};

export const Search: React.FC<Props> = ({ listTitle }) => {
  const fixedTitle = listTitle.slice(1);

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        placeholder={`Search in ${fixedTitle}...`}
      />
    </div>
  );
};
