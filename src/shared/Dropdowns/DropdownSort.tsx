import React, { useState, useEffect, useRef } from "react";
import styles from './Dropdowns.module.scss';
import { useSearchParams } from "react-router-dom";

const DropdownSort: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('Newest');
  const selectRef = useRef<HTMLDivElement>(null);
  
  const handleSelect = (option: string) => {
    setValue(option);
    
    const params = new URLSearchParams(searchParams);

    params.set('sort', option);
    setSearchParams(params);
    
    if (selectRef.current) {
      selectRef.current.blur();
    }
    
    setIsOpen(false);
  };

  const options = ['Newest', 'Alphabetically', 'Cheapest'];

  useEffect(() => {
    const sort = searchParams.get('sort');

    if (sort) {
      setValue(sort);
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Sort by</h4>
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
                onMouseDown={() => handleSelect(option)} 
                className={styles.select__option}
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
