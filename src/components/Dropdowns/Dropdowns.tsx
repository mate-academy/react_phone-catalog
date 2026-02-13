import s from './Dropdowns.module.scss';
import arrowDown from '../../assets/images/icons/Chevron (Arrow Down).svg';
import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

export const Dropdowns: React.FC<Props> = ({options, selected, onChange}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={s.dropdowns} onBlur={() => setTimeout(() => setIsOpen(false), 200)}>
      <button type="button" className={s.dropdownsButton} onClick={() => setIsOpen(!isOpen)}>
        <span className={s.value}>{selected}</span>
        <span className={classNames(s.icon, { [s.iconRotated]: isOpen })}>
          <img className={s.img} src={arrowDown} alt="arrow" aria-hidden="true" />
        </span>
      </button>

      <ul className={classNames(s.sortList, { [s.sortListOpen]: isOpen })}>
        {options.map((option) => (
          <li className={s.sortItem} key={option} onClick={() => handleSelect(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
