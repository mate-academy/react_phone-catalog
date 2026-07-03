// #region imports
import cn from 'classnames';
import { ArrowDownIcon } from './components/ArrowDownIcon';
import { Option } from '../../types/Option';
import { useState } from 'react';
import { useOutsideClick } from '../../../shared/hooks/useOutsideClick';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import baseStyles from './base.module.scss';
import styles from './Dropdown.module.scss';
import { useCloseOnEscape } from '../../../shared/hooks/useCloseOnEscape';
// #endregion

type Props = {
  name: string;
  options: Option[];
  selected: string;
  setSelected: (param: string) => void;
};

export const Dropdown: React.FC<Props> = ({
  name,
  options,
  selected,
  setSelected,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useOutsideClick(() => setShowOptions(false));

  const selectedLabel =
    options.find(option => option.param === selected)?.label || selected;

  const onSelect = (option: string) => {
    setSelected(option);
    setShowOptions(false);
  };

  useCloseOnEscape(() => setShowOptions(false));

  return (
    <div
      className={`${baseStyles.dropdown} ${styles.dropdown}`}
      ref={dropdownRef}
    >
      <label className={styles.selectLabel}>{capitalizeFirstWord(name)}</label>

      <button
        className={cn(baseStyles.select, styles.select, {
          [styles.active]: showOptions,
        })}
        onClick={() => setShowOptions(!showOptions)}
        type="button"
        aria-expanded={showOptions}
        aria-haspopup="listbox"
        aria-controls={`dropdown-${name}`}
      >
        {selectedLabel}

        <ArrowDownIcon isReversed={showOptions} />
      </button>

      {showOptions && (
        <ul role="listbox" className={styles.options} id={`dropdown-${name}`}>
          {options.map(({ param, label }) => {
            const isSelected = selected === param;

            return (
              <li
                key={param}
                role="option"
                aria-selected={isSelected}
                className={cn(styles.option, {
                  [styles.selected]: isSelected,
                })}
                onClick={() => onSelect(param)}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    onSelect(param);
                  }
                }}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
