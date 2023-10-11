import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type DropdownItem = {
  text: string,
  value: string,
};

type Props = {
  items: DropdownItem[],
  filterName: string,
  defaultValue: string,
};

export const Selector: React.FC<Props> = ({
  items,
  filterName,
  defaultValue,
}) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get(filterName) || defaultValue;

  const onClickHandler = () => setIsDropdown(!isDropdown);

  const getSortByText = () => items.find(item => item.value === sortBy)?.text;

  const getParams = (value: string) => {
    const addParam = { [filterName]: value };

    addParam.page = '1';

    return addParam;
  };

  return (
    <div
      className={classNames(
        'selector',
        { 'selector--is-active': isDropdown },
      )}
    >
      <button
        type="button"
        className={classNames(
          'button',
          'button--dropdown',
          { 'button--dropdown-active': isDropdown },
        )}
        onClick={onClickHandler}
      >
        <span>{getSortByText()}</span>

        <span className={`icon ${isDropdown ? 'icon--up-disabled' : 'icon--down-disabled'}`} />
      </button>

      <div
        className={classNames(
          'selector__menu',
          { 'selector__menu--is-active': isDropdown },
        )}
      >
        {items.map(item => (
          <SearchLink
            className={classNames(
              'selector__link',
              { 'selector__link--is-active': item.value === sortBy },
            )}
            key={item.value}
            params={getParams(item.value)}
            onClick={onClickHandler}
          >
            {item.text}
          </SearchLink>
        ))}
      </div>
    </div>
  );
};
