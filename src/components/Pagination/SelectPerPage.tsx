import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  options: PerPage[];
};

export const SelectPerPage: React.FC<Props> = ({ options }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPerPage = searchParams.get('perPage');
  const currentOption = options.find(option => option.name === currentPerPage) || options[0];
  const [isOpen, setIsOpen] = useState(false);

  const chooseSelectValue = (option: PerPage) => {
    searchParams.set('perPage', option.name);
    searchParams.set('page', '1');
    history.push({
      search: searchParams.toString(),
    });

    setIsOpen(false);
  };

  const clickSubscribe = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.removeEventListener('click', clickSubscribe);
    } else {
      document.documentElement.addEventListener('click', clickSubscribe);
    }
  }, [isOpen]);

  return (
    <div
      className={cn({
        Select: true,
        Select__Closest: !isOpen,
      })}
    >
      <label
        className={cn({
          'Select__Active--after': isOpen,
        })}
      />

      <button
        type="button"
        className={cn({
          Select__Active: true,
          'Select__Active--opened': isOpen,
        })}
        onClick={() => setIsOpen(true)}
      >
        {currentOption.name}
        <span>
          <div className={cn({
            Select__Arrow: true,
            'Select__Arrow--opened': isOpen,
          })}
          />
        </span>
      </button>
      <ul className={cn({
        Select__List: true,
        'Select__List--opened': isOpen,
      })}
      >
        {options.map(option => (
          option.name !== currentOption.name && (
            <li
              key={option.name}
              className="Select__Item"
              data-value={option.name}
              onClick={() => chooseSelectValue(option)}
            >
              {option.name}
            </li>
          )
        ))}
      </ul>
    </div>
  );
};
