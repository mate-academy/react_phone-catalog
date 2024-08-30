import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './CustomSelect.module.scss';
import { Option } from '../../../type/Option';
import { useSearchParams } from 'react-router-dom';

type CustomSelectProps<T> = {
  options: Option<T>[];
  value: T;
  onChange: Dispatch<SetStateAction<T>>;
  label: string;
  darkMode: boolean;
};

export const CustomSelectString = ({
  options,
  value,
  onChange,
  label,
  darkMode,
}: CustomSelectProps<string>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sortParam = searchParams.get('sort');

    if (sortParam) {
      onChange(sortParam === 'all' ? 'all' : (String(sortParam) as string));
    }
  }, [searchParams, onChange]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      handleBlur();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    searchParams.set('sort', optionValue);
    setSearchParams(searchParams);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelect} ref={selectRef}>
      <label
        className={classNames(styles.customSelect__label, {
          [styles.customSelect__label_dark]: darkMode,
        })}
        onClick={handleToggle}
      >
        {label}
      </label>
      <div
        className={classNames(styles.customSelect__selected, {
          [styles.customSelect__selected_dark]: darkMode,
          [styles.customSelect__selected_focused]: isFocused,
          [styles.customSelect__selected_focused_dark]: darkMode && isFocused,
        })}
        onClick={handleToggle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
      >
        {options.find(option => option.value === value)?.label}
        <span
          className={classNames(styles.customSelect__selected_arrow, {
            [styles.customSelect__selected_arrow_down_dark]:
              darkMode && !isOpen,
            [styles.customSelect__selected_arrow_down]: !isOpen,
            [styles.customSelect__selected_arrow_up]: isOpen,
            [styles.customSelect__selected_arrow_up_dark]: isOpen && darkMode,
          })}
        ></span>
      </div>

      {isOpen && (
        <ul
          className={classNames(styles.customSelect__options, {
            [styles.customSelect__options_dark]: darkMode,
          })}
        >
          {options.map(option => (
            <li
              key={option.value}
              className={classNames(styles.customSelect__option, {
                [styles.customSelect__option_dark]: darkMode,
              })}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
