import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import { Icons } from '@ui/index';

import { useDropdown, useOutsideClick } from '@hooks/index';

import styles from './Dropdown.module.scss';
import { TDropdownProps } from './TDropdownProps.type';
import { OptionsList } from './options-list/OptionsList';

export const Dropdown: FC<TDropdownProps> = memo(
  ({
    name,
    options,
    isDropdownOpen,
    small = false,
    initialPerPage,
    toggleDropdown,
    setItemPerPage = () => {},
    setCurrentPage = () => {},
    closeDropdown = () => {},
  }) => {
    const { t } = useTranslation();
    const ref = useOutsideClick(closeDropdown);
    const { currentOption, onOptionSelect } = useDropdown({
      options,
      initialPerPage,
      setItemPerPage,
      setCurrentPage,
    });

    const localName = t(`dropdown.name.${name}`);
    const localOption = t(`dropdown.options.${currentOption}`);
    const localAriaLabel = t(`dropdown.ariaLabel.select`, {
      options: currentOption,
    });

    return (
      <div className={styles.dropdown} ref={ref}>
        <label htmlFor={name}>{localName}</label>
        <button
          id={name}
          className={cn(styles.select, { [styles.small]: small })}
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          aria-label={localAriaLabel}
          type="button"
        >
          <span className={styles.dropdownTitle}>
            {localOption}
            {isDropdownOpen ? <Icons.ArrowUpIcon /> : <Icons.ArrowDownIcon />}
          </span>

          {isDropdownOpen && (
            <OptionsList
              options={options}
              selectedValue={currentOption}
              onOptionSelect={onOptionSelect}
            />
          )}
        </button>
      </div>
    );
  },
);
