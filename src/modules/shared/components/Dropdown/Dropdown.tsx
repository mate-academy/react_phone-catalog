import React, { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import { OptionType } from '../../types/OptionType';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

interface Props {
  options: OptionType[];
  initialOption?: OptionType;
  choosedOption: (activeOption: OptionType) => void;
  ladel?: string;
  width?: number;
}

export const Dropdown: React.FC<Props> = ({
  options,
  initialOption,
  ladel,
  choosedOption,
  width,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<OptionType>(
    initialOption ? initialOption : options[0],
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlClickOnPage = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handlClickOnPage);

    return () => document.removeEventListener('click', handlClickOnPage);
  }, []);

  useEffect(() => {
    if (initialOption) {
      setActiveOption(initialOption);
    }
  }, [initialOption]);

  const onOption = (newOption: OptionType) => {
    setActiveOption(newOption);
    setIsOpen(false);
    choosedOption(newOption);
  };

  return (
    <div
      ref={dropdownRef}
      className={styles.dropdown}
      style={{ width: `${width}px` }}
    >
      {ladel && <p className={styles.ladel}>{ladel}</p>}

      <button
        type="button"
        className={cn(styles.button, { [styles.button__focus]: isOpen })}
        onClick={() => setIsOpen(cur => !cur)}
      >
        <span>{t(activeOption.label)}</span>
        <span
          className={cn(styles.chevron, { [styles.chevron__open]: isOpen })}
        ></span>
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map(option => (
            <li
              key={option.value}
              className={styles.items}
              onClick={() => onOption(option)}
            >
              {t(option.label)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
