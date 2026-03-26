import React, { useState, useEffect } from 'react';
import select from './Select.module.scss';
import { useSearchParams, useLocation } from 'react-router-dom';

type Props = {
  data: {
    title: string;
    param: string;
    options: string[];
  };
  func: (option: string) => void;
};

export const Select: React.FC<Props> = ({
  data: { title, param, options },
  func,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<string>(
    searchParams.get(param) || options[0] || '',
  );
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setSelectedOption(searchParams.get(param) || options[0] || '');
  }, [location.pathname, searchParams, param, options]);

  const handleOptionClick = (option: string) => {
    func(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={select.select__content}>
      <h2 className={select.select__title}>{title}</h2>
      <div className={select.select__mainContent}>
        <button
          className={select.select__button}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          {isOpen ? (
            <img
              className={select.select__img}
              src="../../../../../public/img/my/breadcrumbs/ArrowRight.svg"
              alt="ArrowDown"
            />
          ) : (
            <img
              className={select.select__imgUp}
              src="../../../../../public/img/my/breadcrumbs/ArrowRight.svg"
              alt="ArrowDown"
            />
          )}
        </button>
        {isOpen && (
          <div className={select.select__dropdown}>
            <ul className={select.select__list}>
              {options.map(option => (
                <li key={option} className={select.select__item}>
                  <button
                    className={select.select__option}
                    onClick={() => handleOptionClick(option)}
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
