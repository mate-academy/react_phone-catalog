import React from 'react';
import './SearchCatalog.scss';

type Props = {
  searchValue: string;
  handleOfChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchCatalog: React.FC<Props> = ({
  searchValue,
  handleOfChangeInput,
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        id="search-input"
        value={searchValue || ''}
        onChange={e => {
          handleOfChangeInput(e);
        }}
      />
      <svg
        className="search-icon"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          // eslint-disable-next-line max-len
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};
