import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import dropdownStyles from './Dropdown.module.scss';
import { IconSvg } from '../IconSvg/IconSvg';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import classNames from 'classnames';
import { Option, OptionValue } from '../../types/Option';

type Props = {
  options: Option[];
  label: string;
  defaultValue: OptionValue;
  onSelect: (optionValue: OptionValue) => void;
};

export const Dropdown: React.FC<Props> = React.memo(
  ({ options, label, defaultValue, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!dropdownRef.current?.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        buttonRef.current?.blur();
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const selectedOption = useMemo(
      () => options.find(option => option.value === defaultValue) || options[0],
      [defaultValue, options],
    );

    const handleSelectOption = useCallback(
      (option: Option) => {
        setIsOpen(false);
        onSelect(option.value);
      },
      [onSelect],
    );

    return (
      <div ref={dropdownRef} className={dropdownStyles.dropdown}>
        <h2 className={dropdownStyles.dropdown__title}>{label}</h2>
        <button
          ref={buttonRef}
          className={classNames(dropdownStyles.dropdown__button, {
            [dropdownStyles['dropdown__button--active']]: isOpen,
          })}
          onClick={() => setIsOpen(currentState => !currentState)}
        >
          {selectedOption.label}
          <IconSvg
            dataPath={
              isOpen ? ICON_DATA_PATHS.ARROW.UP : ICON_DATA_PATHS.ARROW.DOWN
            }
          />
        </button>
        <ul
          className={classNames(dropdownStyles.dropdown__list, {
            [dropdownStyles['dropdown__list--active']]: isOpen,
          })}
        >
          {options.map(option => (
            <li
              key={option.value}
              className={dropdownStyles.dropdown__item}
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';
