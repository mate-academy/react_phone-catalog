import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { data } from '../../../assets/dropdowns/data';
import { DropdownType } from '../../../types/DropdownType';
import './dropdown.scss';
import { getSearchWith } from '../../../services/getSearchWith';

type Props = {
  dropdownType: DropdownType;
};

export const Dropdown: React.FC<Props> = ({ dropdownType }) => {
  const { name, title, options } = data[dropdownType];
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownValue = searchParams.get(name) || '';
  const currentOption = options.find(option => {
    return (Object.values(option)[0])?.toString() === dropdownValue;
  }) || options[0];
  const currentOptionName = Object.keys(currentOption)[0];
  const currentOptionValue = Object.values(currentOption)[0];

  useEffect(() => {
    if (dropdownValue !== currentOptionValue?.toString()) {
      setSearchParams(getSearchWith(
        { [name]: null },
        searchParams,
      ));
    }
  }, [dropdownValue, currentOptionValue]);

  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isActive]);

  return (
    <div className={`dropdown dropdown--${name}`}>
      <p className="dropdown__title">{title}</p>
      <button
        type="button"
        className="dropdown__button"
        onClick={() => {
          setIsActive(active => !active);
        }}
      >
        {currentOptionName}
        <img
          src="./img/icons/DownArrow.svg"
          alt="Arrow"
          className="dropdown__button-arrow"
        />
      </button>

      {(isActive) && (
        <ul
          className="dropdown__menu"
          key={name}
          ref={ref}
        >
          {options.map(option => {
            const [optionName, optionValue] = Object.entries(option)[0];
            const address = getSearchWith(
              { [name]: optionValue, page: 1 },
              searchParams,
            );

            return (
              <li className="dropdown__item" key={optionName}>
                <Link
                  className="dropdown__link"
                  to={`?${address}`}
                  onClick={() => {
                    setIsActive(active => !active);
                  }}
                >
                  {optionName}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
