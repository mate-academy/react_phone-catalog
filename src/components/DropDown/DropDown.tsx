import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearchWith';
import { getDropDownText } from '../../utils/getDropDownText';
import { SelectOption } from '../../types/SelectOption';

import './DropDown.scss';

type Props = {
  options: SelectOption[];
  label: string;
  searchParamName: string;
};

export const DropDown: React.FC<Props> = ({
  options,
  label,
  searchParamName,
}) => {
  const [isActive, setIsActive] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchParam = searchParams.get(searchParamName) || options[0].label;

  const buttonText = getDropDownText(searchParam, options) || searchParam;

  const searchParamClick = (option: SelectOption) => {
    const newParams = { [searchParamName]: option.value, page: '1' };

    setSearchParams(
      getSearchWith(searchParams, newParams),
    );

    setIsActive(false);
  };

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleDocumentClick = () => {
      setIsActive(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isActive]);

  return (
    <div className="DropDown">
      <span className="DropDown-Label">
        {label}
      </span>

      <button
        type="button"
        className={cn('DropDown-Button', {
          'DropDown-Button_active': isActive,
        })}
        onClick={() => setIsActive(active => !active)}
      >
        {buttonText}

        <span
          className={cn('DropDown-Icon Icon Icon_arrow', {
            Icon_arrow_down: !isActive,
            Icon_arrow_up: isActive,
          })}
        />
      </button>

      <ul
        className={cn('DropDown-List', {
          'DropDown-List_active': isActive,
        })}
      >
        {options.map(option => (
          <li key={option.label}>
            <button
              type="button"
              className="DropDown-Option"
              onClick={() => searchParamClick(option)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
