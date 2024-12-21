import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import styles from './Select.module.scss';
import { getSearchWith } from '../../../services/getSearchWith';

interface OptionsType {
  id: number;
  option: string;
}

type Props = {
  selectType: string;
  options: OptionsType[];
};

export const Select: React.FC<Props> = ({ selectType, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultOption = options[0].option;
  const [currentOption, setCurrentOption] = useState(defaultOption);

  useEffect(() => {
    const currentValue = searchParams.get(selectType) || defaultOption;

    setCurrentOption(currentValue);
  }, [searchParams, selectType]);

  function setSearchWith(params: Record<string, string | null>) {
    const search = getSearchWith(params, searchParams);

    if (search !== searchParams.toString()) {
      setSearchParams(search);
    }
  }

  const handleSelectChange = (e: React.MouseEvent<HTMLUListElement>) => {
    const option = e.target as HTMLElement;
    const item = option.closest(`.${styles.select__item}`);

    if (!item) {
      return;
    }

    const value = item.getAttribute('data-value');

    if (value) {
      if (value === defaultOption) {
        selectType !== 'perPage'
          ? setSearchWith({ [selectType]: null })
          : setSearchWith({ [selectType]: null, page: null });
      } else {
        selectType === 'perPage'
          ? setSearchWith({ [selectType]: value, page: '1' })
          : setSearchWith({ [selectType]: value });
      }

      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className={styles.select} ref={selectRef}>
      <button
        className={cn([styles.select__toggle], {
          [styles.focus]: isOpen,
        })}
        onClick={() => {
          setIsOpen(curr => !curr);
        }}
      >
        <p className={styles.select__value}>
          {currentOption || 'Please choose the option'}
        </p>
        <img
          src="./img/icons/arrow-down.svg"
          alt="Arrow"
          style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
        />
      </button>

      <ul
        className={cn(styles.select__list, {
          [styles.visible]: isOpen,
        })}
        onClick={handleSelectChange}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {options.map(option => (
          <li
            key={option.id}
            className={styles.select__item}
            data-value={option.option}
          >
            <p className={styles.select__text}>{option.option}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
