import React from 'react';

type Props = {
  searchDirectory: string,
  value: string,
  changeValue: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const Search: React.FC<Props> = ({
  searchDirectory,
  value,
  changeValue,
}) => {
  return (
    <div className="header__search">
      <input
        type="text"
        className="header__input"
        placeholder={`Search in ${searchDirectory}...`}
        value={value}
        onChange={changeValue}
      />

      <div className="icon icon--search">
        <img
          src="img/icons/search.svg"
          alt="Icon Search"
        />
      </div>
    </div>
  );
};
