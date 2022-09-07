import classNames from 'classnames';
import { useRef, useState, useEffect } from 'react';
import { Quantity } from '../../Helpers/types/Quantity';
import { Sorter } from '../../Helpers/types/Sorter';
import './Select.scss';

type Props = {
  options: Sorter[] | Quantity[],
  selectedValue: string,
  handler: (param: string) => void,
  id: string,
  isSmall: boolean,
};

export const Select: React.FC<Props> = ({
  options, selectedValue, handler, id, isSmall,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detectClickOutside = (event: MouseEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', detectClickOutside);

    return () => {
      document.removeEventListener('click', detectClickOutside);
    };
  }, []);

  const changeHandler = (param: string) => {
    setIsOpen(false);
    handler(param);
  };

  return (
    <div
      className={classNames(
        'Select',
        { 'Select--open': isOpen },
        { 'Select--small': isSmall },
      )}
      ref={selectRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          'Select__btn',
          'body-text',
          { 'Select__btn--open': isOpen },
        )}
        id={id}
      >
        {selectedValue}
      </button>

      {isOpen && (
        <div
          className="Select__content"
        >
          {options.map(option => (
            <button
              type="button"
              className="Select__item-container body-text body-text--light"
              key={option}
              onClick={() => changeHandler(`${option}`)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
