import React, { useState } from 'react';
import select from './Select.module.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  data: {
    title: string;
    param: string;
    options: string[];
  };
  onSelect?: (option: string) => void;
};

export const Select: React.FC<Props> = ({ data, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<string>(
    searchParams.get(data.param) || data.options[0],
  );

  const handlePick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className={select.select}>
      <p className={select.select__label}>{data.title}</p>
      <div className={select.select__content}>
        <button
          className={select.select__button}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          {isOpen ? (
            <img
              src="/img/select/arrow-down.svg"
              className={select.select__arrow}
            />
          ) : (
            <img
              src="/img/select/arrow-up.svg"
              alt="^"
              className={select.select__arrow}
            />
          )}
        </button>

        {isOpen && (
          <div className={select.select__dropdown}>
            <ul className={select.select__list}>
              {data.options.map(option => (
                <li key={option} className={select.select__item}>
                  <button
                    className={select.select__option}
                    onClick={() => handlePick(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
