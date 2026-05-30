import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './CustomSelect.module.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  id: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
};

export const CustomSelect = ({
  id,
  label,
  value,
  options,
  onChange,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(() => {
    return options.find(option => option.value === value) || options[0];
  }, [options, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as Node;
      const isClickedInside = rootRef.current?.contains(clickedElement);

      if (!isClickedInside) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleToggleMenu = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const handleSelectOption = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const isOptionSelected = (optionValue: string) => optionValue === value;

  return (
    <div ref={rootRef} className={classNames(styles.root, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <button
        id={id}
        type="button"
        className={classNames(styles.trigger, {
          [styles.triggerOpen]: isOpen,
        })}
        onClick={handleToggleMenu}
      >
        <span className={styles.triggerLabel}>{selectedOption?.label}</span>
        <span
          className={classNames(styles.arrow, {
            [styles.arrowOpen]: isOpen,
          })}
        />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {options.map(option => {
            const isSelected = isOptionSelected(option.value);

            return (
              <button
                key={option.value}
                type="button"
                className={classNames(styles.option, {
                  [styles.optionSelected]: isSelected,
                })}
                onClick={() => handleSelectOption(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
