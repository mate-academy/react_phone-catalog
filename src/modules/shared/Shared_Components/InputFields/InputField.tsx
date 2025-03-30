import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { ModifiedData } from '../../Types/novaPostTypes';
// eslint-disable-next-line max-len
import { SearchData } from '../ProductPage/types/types';

interface Props {
  title: string;
  searchData: SearchData;
  // eslint-disable-next-line max-len
  setSearchData: (val: SearchData) => void;
  listOfItems: ModifiedData[];
  isLoading: boolean;
}

export const InputField: React.FC<Props> = ({
  title,
  searchData,
  setSearchData,
  isLoading,
  listOfItems,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const noInformation =
    isOpened &&
    !listOfItems.length &&
    searchData.searchQuery.length &&
    !isLoading;

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setSearchData({ ...searchData, searchQuery: inputValue });
    }, 800);

    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className="input-field">
      <label
        htmlFor={`input-list-${title}`}
        className="input-field__text"
      >{`Your ${title}`}</label>

      <input
        id={`input-list-${title}`}
        className={classNames('input-field__options', {
          'input-field__options--disabled': isLoading,
        })}
        onFocus={() => setIsOpened(true)}
        title="Please, enter text only with ukrainian letters"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={() => setIsOpened(false)}
        placeholder={`Find your ${title}`}
        disabled={isLoading}
        required
      />

      {isOpened && !isLoading && listOfItems?.length > 0 ? (
        <ul className="input-field__options-list">
          {listOfItems.flatMap((item: ModifiedData, i) => (
            <li
              key={`${item.ref}-${i}`}
              onMouseDown={() => {
                setInputValue(item.description);
                setSearchData({ ...searchData, searchRef: item.ref });
                setIsOpened(false);
              }}
              className={classNames('input-field__option', {
                'input-field__option--is-Active':
                  item.description === inputValue,
              })}
            >
              {item.description}
            </li>
          ))}
        </ul>
      ) : noInformation ? (
        <ul className="input-field__options-list">
          <li className="input-field__option">
            Could not find any information
          </li>
        </ul>
      ) : isLoading && isOpened ? (
        <ul className="input-field__options-list">
          <li className="input-field__option">Loading data...</li>
        </ul>
      ) : null}
    </div>
  );
};
