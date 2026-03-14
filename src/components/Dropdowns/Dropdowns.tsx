import s from './Dropdowns.module.scss';
import arrowDown from '../../assets/images/icons/Chevron (Arrow Down).svg';
import classNames from 'classnames';
import { useState } from 'react';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
};

export const Dropdowns: React.FC<Props> = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === selected);

  return (
    <div className={s.dropdowns} onBlur={() => setTimeout(() => setIsOpen(false), 200)}>
      <button
        type="button"
        className={s.dropdownsButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
      >
        <span className={s.value}>{selectedOption?.label || selected}</span>
        <span className={classNames(s.icon, { [s.iconRotated]: isOpen })}>
          <img className={s.img} src={arrowDown} alt="arrow" aria-hidden="true" />
        </span>
      </button>

      <ul className={classNames(s.sortList, { [s.sortListOpen]: isOpen })}>
        {options.map((option) => (
          <li
            className={classNames(s.sortItem, { [s.active]: option.value === selected })}
            key={option.value}
            onClick={() => handleSelect(option)}
            aria-selected={option.value === selected}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
