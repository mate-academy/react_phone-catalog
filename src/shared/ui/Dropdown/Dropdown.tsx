import classNames from 'classnames';

import React from 'react';
import styles from './Dropdown.module.scss';
import ArrowIcon from '@public/img/icons/icon-arrow.svg?react';
import { useOpenDropdown } from './hooks/useOpenDropdown';
import { useTranslation } from 'react-i18next';

type Option = {
  value: string;
  labelKey: string;
};

type Props = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const Dropdown: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
  className,
}) => {
  const {
    isOpen,
    shouldRender,
    dropdownRef,
    handleSelect,
    toggleOpen,
    handleAnimationEnd,
  } = useOpenDropdown(onChange);

  const { t } = useTranslation();

  const selected = options.find(option => option.value === value);

  return (
    <div className={classNames(styles.dropdown, className)} ref={dropdownRef}>
      <span className={styles.dropdownLabel}>{label}</span>

      <button className={styles.dropdownSelect} onClick={toggleOpen}>
        <span className={styles.dropdownSelectedText}>
          {selected ? t(selected.labelKey) : ''}
        </span>

        <ArrowIcon
          className={classNames(styles.dropdownIcon, {
            [styles.dropdownIconOpen]: isOpen,
          })}
        />
      </button>

      {shouldRender && (
        <ul
          className={classNames(styles.dropdownList, {
            [styles.isClosing]: !isOpen,
          })}
          onAnimationEnd={handleAnimationEnd}
        >
          {options.map(option => (
            <li
              key={option.value}
              className={classNames(styles.dropdownOption, {
                [styles.isActive]: option.value === value,
              })}
              onClick={() => handleSelect(option.value)}
            >
              {t(option.labelKey)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
