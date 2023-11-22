/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../../styles/components/Dropdown/Dropdown.scss';

import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/routerService';

export type Option = {
  name: string;
  property: { [key: string]: string };
};

type Props = {
  options: Option[];
  title: string;
  initialOption?: number;
};

export const Dropdown: React.FC<Props> = ({
  options,
  title,
  initialOption = 0,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const currentOptionValue = searchParams
    .get(Object.keys(options[0].property)[0]);

  const currentOptionFromSearch = options.find(option => {
    return Object.values(option.property)[0] === currentOptionValue;
  });

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  const handleDropdownOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleClick = (option: Option) => {
    setIsOpen(false);
    let search = getSearchWith(option.property, searchParams);

    search = getSearchWith({ page: 1 }, search);

    setSearchParams(search);
  };

  return (
    <div
      className="dropdown"
      ref={rootRef}
    >
      <p className="dropdown__title">
        {title}
      </p>

      <div
        className={classNames('dropdown__visible', {
          'is-visible': isOpen,
        })}
        onClick={handleDropdownOpen}
      >
        {currentOptionValue ? (
          <p className="dropdown__selected">
            {currentOptionFromSearch?.name}
          </p>
        ) : (
          <p className="dropdown__selected">
            {options[initialOption].name}
          </p>
        )}
        <span className="dropdown__icon" />
      </div>

      <ul className={classNames('dropdown__list', {
        'is-visible': isOpen,
      })}
      >
        {options.map(option => (
          <li
            key={option.name}
            className="dropdown__option"
            onClick={() => handleClick(option)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
