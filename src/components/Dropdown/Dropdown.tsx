import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import cn from 'classnames';
import './Dropdown.scss';

type Props = {
  dropdownItems: string[];
  dropdownLabel: string;
  id: string;
  isCheckedSortDropdown: boolean;
  isCheckedPaginationDropdown: boolean;
  setChecked: (arg: boolean) => void;
};

const Dropdown: React.FC<Props> = ({
  dropdownItems,
  dropdownLabel,
  id,
  isCheckedSortDropdown,
  isCheckedPaginationDropdown,
  setChecked,
}) => {
  const location = useLocation();
  const history = useHistory();
  const urlSearchParam = new URLSearchParams(location.search);

  const pushSearchParam = (searchQuery: string) => {
    urlSearchParam.set(`${id}Query`, searchQuery);

    history.push({
      search: urlSearchParam.toString(),
    });
  };

  const changeCheckedStatus = (status: boolean) => {
    if (!isCheckedSortDropdown && !isCheckedPaginationDropdown) {
      setChecked(status);
    } else if (
      (!isCheckedSortDropdown && isCheckedPaginationDropdown)
      || (isCheckedSortDropdown && !isCheckedPaginationDropdown)
    ) {
      if (!status) {
        setChecked(status);
      }
    }
  };

  return (
    <div className="dropdown">
      <div className="dropdown__description">
        {dropdownLabel}
      </div>
      <input
        type="checkbox"
        checked={
          (id === 'sort')
            ? isCheckedSortDropdown
            : isCheckedPaginationDropdown
        }
        id={dropdownLabel}
        className="dropdown__checkbox"
        onChange={() => changeCheckedStatus(
          (id === 'sort')
            ? !isCheckedSortDropdown
            : !isCheckedPaginationDropdown,
        )}
      />
      <label
        htmlFor={dropdownLabel}
        className={cn(
          'dropdown__label',
          {
            dropdown__label_checked:
              (id === 'sort')
                ? isCheckedSortDropdown
                : isCheckedPaginationDropdown,
          },
        )}
      >
        {urlSearchParam.get(`${id}Query`)
          ? urlSearchParam.get(`${id}Query`)
          : dropdownItems[0]}
      </label>
      <ul
        className={cn(
          'dropdown__body',
          {
            dropdown__body_checked:
              (id === 'sort')
                ? isCheckedSortDropdown
                : isCheckedPaginationDropdown,
          },
        )}
      >
        {dropdownItems.map(selector => (
          <li
            key={selector}
            className="dropdown__item"
          >
            <button
              type="button"
              className={cn(
                'dropdown__button',
                {
                  dropdown__button_active: urlSearchParam.get(`${id}Query`) === selector,
                },
              )}
              onClick={() => {
                changeCheckedStatus(false);
                pushSearchParam(selector);
              }}
            >
              {selector}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
