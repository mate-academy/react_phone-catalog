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
    setIsOpened(false);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleLabelClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    event.preventDefault();
    selectRef.current?.focus();
    selectRef.current?.click();
  };

  const handleSelectClick = () => {
    setIsOpened(prevIsOpened => !prevIsOpened);
    selectRef.current?.focus();
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
      <label htmlFor={id} className={styles.Label} onClick={handleLabelClick}>
        {title}
      </label>

      <button
        id={id}
        type="button"
        className={styles.Select}
        ref={selectRef}
        onClick={handleSelectClick}
      >
        {chosenOption}
        {isOpened ? (
          <UpArrowSVG className={styles.Arrow} label={accessCollapse} />
        ) : (
          <DownArrowSVG className={styles.Arrow} label={accessExpand} />
        )}
      </button>

      <menu className={styles.Options}>
        {options.map(option => (
          <li key={option}>
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
