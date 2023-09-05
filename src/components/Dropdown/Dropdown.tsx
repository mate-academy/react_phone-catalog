import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';

import { data } from '../../assets/dropdowns/data';
import { DropdownType } from '../../types/Dropdown';
import './dropdown.scss';

type Props = {
  dropdownType: DropdownType;
};

export const Dropdown: React.FC<Props> = ({
  dropdownType,
}) => {
  const { name, title, options } = data[dropdownType];
  const [selectedOption] = useState(options[0]);
  const currentOptionName = Object.keys(selectedOption)[0];
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

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
            const [optionName, adress] = Object.entries(option)[0];

            return (
              <li className="dropdown__item" key={optionName}>
                <Link
                  className="dropdown__link"
                  to={`./?${adress}`}
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
