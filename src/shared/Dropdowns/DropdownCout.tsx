import React, { useState, useRef, useEffect } from "react";
import styles from './Dropdowns.module.scss';
import { useSearchParams } from "react-router-dom";

const DropdownSort: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('8');
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setValue(option);

    const params = new URLSearchParams(searchParams);

    params.set('perPage', option);
    params.set('page', '1');
    setSearchParams(params);

    if (selectRef.current) {
      selectRef.current.blur();
    }

    setIsOpen(false);
  };

  const options = ['4', '8', '16', 'all'];

  useEffect(() => {
    const perPage = searchParams.get('perPage') || '8';

    setValue(perPage);
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Items on page</h4>
      <div
        className={styles.select}
        onClick={() => setIsOpen(prev => !prev)}
        ref={selectRef}
        tabIndex={0}
      >
        <h4 className={styles.select__title}>{value}</h4>
        {isOpen ? (
          <img
            src="images/icons/ArrowUp.png"
            className={styles.select__img}
          />
        ) : (
          <img
            src="images/icons/ArrowDown.png"
            className={styles.select__img}
          />
        )}
        {isOpen && (
          <div className={styles.select__options}>
            {options.map((option) => (
              <div
                key={option}
                className={styles.select__option}
                onMouseDown={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownSort;
