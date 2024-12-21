import classNames from 'classnames';
import { DownArrowSVG } from '../SVGs/DownArrowSVG';
import { UpArrowSVG } from '../SVGs/UpArrowSVG';
import styles from './Dropdown.module.scss';
import { useLanguage } from '../Contexts/LanguageContext';
import { useId, useRef, useState } from 'react';

type HandleChange = (value: string) => void;

type Props = {
  title: string;
  options: string[];
  chosenOption: string;
  onChange: HandleChange;
  className?: string;
};

export const Dropdown: React.FC<Props> = ({
  title,
  options,
  chosenOption,
  onChange,
  className,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLElement>(null);
  const selectRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const { accessExpand, accessCollapse } = useLanguage().localeTexts;

  const changeValue = (option: string) => {
    onChange(option);
    selectRef.current?.blur();
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isOpened && event.detail > 0) {
      selectRef.current?.blur();
    } else {
      selectRef.current?.focus();
    }
  };

  const handleFocus = () => {
    setIsOpened(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!dropdownRef.current?.contains(event.relatedTarget)) {
      setIsOpened(false);
    }
  };

  return (
    <article
      className={classNames(
        styles.Dropdown,
        isOpened && styles.Dropdown_open,
        className,
      )}
      ref={dropdownRef}
      onMouseDown={handleMouseDown}
      onBlur={handleBlur}
    >
      <span id={id} className={styles.Label} onClick={handleClick}>
        {title}
      </span>

      <button
        type="button"
        className={styles.Select}
        ref={selectRef}
        onClick={handleClick}
        onFocus={handleFocus}
        aria-labelledby={id}
        aria-haspopup="listbox"
        aria-expanded={isOpened}
      >
        {chosenOption}
        {isOpened ? (
          <UpArrowSVG className={styles.Arrow} label={accessCollapse} />
        ) : (
          <DownArrowSVG className={styles.Arrow} label={accessExpand} />
        )}
      </button>

      <menu role="listbox" className={styles.Options}>
        {options.map(option => (
          <li key={option} role="option">
            <button
              type="button"
              className={styles.Option}
              onClick={() => changeValue(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </menu>
    </article>
  );
};
