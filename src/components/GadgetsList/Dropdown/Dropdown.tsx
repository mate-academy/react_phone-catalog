import { MouseEvent, useEffect, useRef, useState } from 'react';
import style from './Dropdown.module.scss';
import classNames from 'classnames';
import { IconUp } from '../../Icons/IconUp';
import { IconDown } from '../../Icons/IconDown';
import { SortBy } from '../../../enums/SortBy';

interface DropdownProps {
  buttonText: string;
  setSortBy: (v: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  buttonText,
  setSortBy,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const items = [SortBy.newest, SortBy.alphabetically, SortBy.cheapest];
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;

    setSortBy(target.textContent || '');
  };

  const toggleDropdown = () => {
    setOpen(prevOpen => !prevOpen);
  };

  useEffect(() => {
    const handler = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className={style.dropdown}>
      <div
        onClick={toggleDropdown}
        ref={buttonRef}
        className={classNames(style.dropdown__dropdownBtn, {
          [style.dropdown__open]: open,
        })}
      >
        {buttonText}
        <span className={style.dropdown____toggleIcon}>
          {open ? (
            <IconUp className={style.dropdown____toggleIcon} />
          ) : (
            <IconDown className={style.dropdown____toggleIcon} />
          )}
        </span>
      </div>

      <div
        className={classNames(style.dropdown__content, {
          [style.dropdown__openContent]: open,
        })}
      >
        {items.map(item => (
          <div
            className={style.dropdown__item}
            onClick={e => handleClick(e)}
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
